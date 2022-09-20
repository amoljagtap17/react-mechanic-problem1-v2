import { objectType, extendType } from "nexus";

export const Division = objectType({
  name: "Division",
  definition(t) {
    t.nonNull.string("id", { description: "ID of the Division" });
    t.nonNull.string("divisionName", { description: "Name of the Division" });
    t.nonNull.date("createdAt", { description: "Created Date" });
    t.nonNull.list.nonNull.field("departments", {
      description: "Departments Info",
      type: "Department",
      async resolve(parent, _args, { prisma }) {
        return await prisma.division
          .findUnique({
            where: {
              id: parent.id,
            },
          })
          .departments();
      },
    });
  },
});

export const DivisionQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.nonNull.field("divisions", {
      type: "Division",
      description: "Get all Divisions details",
      resolve(_parent, _args, { prisma }) {
        return prisma.division.findMany();
      },
    });
  },
});
