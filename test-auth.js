// Simple test script to verify authentication
const bcrypt = require('bcryptjs');

async function testPasswordHash() {
  const plainPassword = "password";
  const hashedPassword = await bcrypt.hash(plainPassword, 10);
  
  console.log("Plain password:", plainPassword);
  console.log("Hashed password:", hashedPassword);
  
  const isValid = await bcrypt.compare(plainPassword, hashedPassword);
  console.log("Password comparison result:", isValid);
  
  // Test with the actual hash from seed
  const seedHash = "$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi"; // Example hash
  console.log("Testing with different hash...");
}

testPasswordHash().catch(console.error);
