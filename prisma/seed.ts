import {
  Company,
  CompanyStatus,
  Prisma,
  PrismaClient,
  UserRole,
  UserStatus,
} from "@prisma/client";
import * as bcrypt from "bcryptjs";

// Type for Prisma transaction context
type PrismaTransaction = Omit<
  PrismaClient,
  "$connect" | "$disconnect" | "$on" | "$transaction" | "$use" | "$extends"
>;

const prisma = new PrismaClient();

interface CompanyData {
  name: string;
  slug: string;
  description: string;
  status: CompanyStatus;
  logo: string;
  website: string;
  address: string;
  phone: string;
  email: string;
}

interface UserData {
  name: string;
  email: string;
  username: string;
  image: string;
  role: UserRole;
  status: UserStatus;
  company: Company;
}

async function seed(): Promise<void> {
  console.log("🌱 Starting database seeding...");

  try {
    await prisma.$transaction(async (tx) => {
      const companies = await seedCompanies(tx);
      console.log("✅ Companies created");

      await seedUsers(companies, tx);
      console.log("✅ Users created and linked to companies");
    });

    console.log("🌱 Database seeding completed successfully");
  } catch (error) {
    console.error("❌ Error during database seeding:", error);
    throw error;
  }
}

async function seedCompanies(tx: PrismaTransaction): Promise<Company[]> {
  const companiesData: CompanyData[] = [
    {
      name: "Tech Corp",
      slug: "tech-corp",
      description: "A leading technology company",
      status: CompanyStatus.ACTIVE,
      logo: "https://example.com/logo1.png",
      website: "https://techcorp.example.com",
      address: "123 Tech Street, Silicon Valley, CA",
      phone: "+1 (555) 123-4567",
      email: "contact@techcorp.example.com",
    },
    {
      name: "Digital Solutions",
      slug: "digital-solutions",
      description: "Digital transformation experts",
      status: CompanyStatus.ACTIVE,
      logo: "https://example.com/logo2.png",
      website: "https://digitalsolutions.example.com",
      address: "456 Digital Ave, Tech City, NY",
      phone: "+1 (555) 987-6543",
      email: "info@digitalsolutions.example.com",
    },
  ];

  const companies = await Promise.all(
    companiesData.map((company) =>
      tx.company.upsert({
        where: { slug: company.slug },
        create: company,
        update: company,
      }),
    ),
  );

  return companies;
}

async function seedUsers(
  companies: Company[],
  tx: PrismaTransaction,
): Promise<void> {
  // Hash password once and reuse for all users
  const hashedPassword = await bcrypt.hash("password", 10);

  const usersData: UserData[] = [
    {
      name: "John Owner",
      email: "john@example.com",
      username: "john",
      image: "https://example.com/john.png",
      role: UserRole.OWNER,
      status: UserStatus.ACTIVE,
      company: companies[0],
    },
    {
      name: "Sarah Admin",
      email: "sarah@example.com",
      username: "sarah",
      image: "https://example.com/sarah.png",
      role: UserRole.ADMIN,
      status: UserStatus.ACTIVE,
      company: companies[0],
    },
    {
      name: "Mike Member",
      email: "mike@example.com",
      username: "mike",
      image: "https://example.com/mike.png",
      role: UserRole.MEMBER,
      status: UserStatus.ACTIVE,
      company: companies[0],
    },
    {
      name: "Lisa Inactive",
      email: "lisa@example.com",
      username: "lisa",
      image: "https://example.com/lisa.png",
      role: UserRole.MEMBER,
      status: UserStatus.INACTIVE,
      company: companies[1],
    },
    {
      name: "Tom Suspended",
      email: "tom@example.com",
      username: "tom",
      image: "https://example.com/tom.png",
      role: UserRole.ADMIN,
      status: UserStatus.SUSPENDED,
      company: companies[1],
    },
  ];

  // Process users sequentially to avoid potential race conditions
  for (const userData of usersData) {
    try {
      const user = await tx.user.upsert({
        where: { email: userData.email },
        create: {
          name: userData.name,
          email: userData.email,
          username: userData.username,
          image: userData.image,
          password: hashedPassword,
          emailVerified: new Date(),
        },
        update: {
          name: userData.name,
          username: userData.username,
          image: userData.image,
        },
      });

      await tx.companyUser.upsert({
        where: {
          userId_companyId: {
            userId: user.id,
            companyId: userData.company.id,
          },
        },
        create: {
          userId: user.id,
          companyId: userData.company.id,
          role: userData.role,
          status: userData.status,
        },
        update: {
          role: userData.role,
          status: userData.status,
        },
      });

      console.log(`✅ User ${userData.name} (${userData.email}) processed`);
    } catch (error) {
      console.error(`❌ Error processing user ${userData.email}:`, error);
      throw error;
    }
  }
}

// Main execution
seed()
  .catch((error) => {
    console.error("❌ Fatal error during seeding:", error);
    process.exit(1);
  })
  .finally(async () => {
    try {
      await prisma.$disconnect();
      console.log("🔌 Database connection closed");
    } catch (error) {
      console.error("❌ Error disconnecting from database:", error);
    }
  });
