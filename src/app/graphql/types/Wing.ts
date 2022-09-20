import { objectType, extendType } from "nexus";

export const Wing = objectType({
  name: "Wing",
  definition(t) {
    t.nonNull.string("id", { description: "ID of the Wing" });
    t.nonNull.string("wingName", { description: "Name of the Wing" });
    t.nonNull.date("createdAt", { description: "Created Date" });
    t.nonNull.list.nonNull.field("seats", {
      description: "All the seats associated to the Wing",
      type: "Seat",
      async resolve(parent, _args, { prisma }) {
        return await prisma.seat.findMany({
          where: {
            wingId: parent.id,
          },
        });
      },
    });
  },
});

export const WingQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.nonNull.field("wings", {
      type: "Wing",
      description: "Get all Wings details",
      resolve(_parent, _args, { prisma }) {
        return prisma.wing.findMany();
      },
    });
  },
});
