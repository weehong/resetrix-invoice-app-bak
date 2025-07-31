"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcrypt = __importStar(require("bcryptjs"));
const prisma = new client_1.PrismaClient();
async function seed() {
    console.log("🌱 Starting database seeding...");
    try {
        await prisma.$transaction(async (tx) => {
            const companies = await seedCompanies(tx);
            console.log("✅ Companies created");
            await seedUsers(companies, tx);
            console.log("✅ Users created and linked to companies");
        });
        console.log("🌱 Database seeding completed successfully");
    }
    catch (error) {
        console.error("❌ Error during database seeding:", error);
        throw error;
    }
}
async function seedCompanies(tx) {
    const companiesData = [
        {
            name: "Tech Corp",
            slug: "tech-corp",
            description: "A leading technology company",
            status: client_1.CompanyStatus.ACTIVE,
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
            status: client_1.CompanyStatus.ACTIVE,
            logo: "https://example.com/logo2.png",
            website: "https://digitalsolutions.example.com",
            address: "456 Digital Ave, Tech City, NY",
            phone: "+1 (555) 987-6543",
            email: "info@digitalsolutions.example.com",
        },
    ];
    const companies = await Promise.all(companiesData.map((company) => tx.company.upsert({
        where: { slug: company.slug },
        create: company,
        update: company,
    })));
    return companies;
}
async function seedUsers(companies, tx) {
    // Hash password once and reuse for all users
    const hashedPassword = await bcrypt.hash("password", 10);
    const usersData = [
        {
            name: "John Owner",
            email: "john@example.com",
            username: "john",
            image: "https://example.com/john.png",
            role: client_1.UserRole.OWNER,
            status: client_1.UserStatus.ACTIVE,
            company: companies[0],
        },
        {
            name: "Sarah Admin",
            email: "sarah@example.com",
            username: "sarah",
            image: "https://example.com/sarah.png",
            role: client_1.UserRole.ADMIN,
            status: client_1.UserStatus.ACTIVE,
            company: companies[0],
        },
        {
            name: "Mike Member",
            email: "mike@example.com",
            username: "mike",
            image: "https://example.com/mike.png",
            role: client_1.UserRole.MEMBER,
            status: client_1.UserStatus.ACTIVE,
            company: companies[0],
        },
        {
            name: "Lisa Inactive",
            email: "lisa@example.com",
            username: "lisa",
            image: "https://example.com/lisa.png",
            role: client_1.UserRole.MEMBER,
            status: client_1.UserStatus.INACTIVE,
            company: companies[1],
        },
        {
            name: "Tom Suspended",
            email: "tom@example.com",
            username: "tom",
            image: "https://example.com/tom.png",
            role: client_1.UserRole.ADMIN,
            status: client_1.UserStatus.SUSPENDED,
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
        }
        catch (error) {
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
    }
    catch (error) {
        console.error("❌ Error disconnecting from database:", error);
    }
});
