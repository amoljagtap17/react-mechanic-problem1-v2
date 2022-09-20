import { PrismaClient } from "@prisma/client";
import { prisma } from "app/services";

export interface Context {
  prisma: PrismaClient;
}

function createContext(): Context {
  const context: Context = { prisma };

  return context;
}

export { createContext };
