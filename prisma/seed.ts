import { PrismaClient } from "../app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import 'dotenv/config';
import { categories } from "./data/categories";
import { products } from "./data/products";

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

async function main() {
    try {
        await prisma.category.createMany({
            data: categories,
            skipDuplicates: true,
        });
        await prisma.product.createMany({
            data: products,
            skipDuplicates: true,
        });

        console.log("Seed completed!");
    } catch (error) {
        console.error("Seed failed: ", error);
    } finally {
        await prisma.$disconnect();
    }
}

main();