import { objectType, extendType } from "nexus";

export const Wing = objectType({
  name: "Wing",
  definition(t) {
    t.nonNull.string("id", { description: "ID of the Wing" });
    t.nonNull.string("wingName", { description: "Name of the Wing" });
    t.nonNull.date("createdAt", { description: "Created Date" });
    t.nonNull.field("seatsCount", {
      description: "Total seats for the current wing",
      type: "Int",
      async resolve(parent, _args, { prisma }) {
        const totalSeats = await prisma.seat.findMany({
          where: {
            wingId: parent.id,
          },
          select: {
            id: true,
          },
        });

        const allocatedSeats = await prisma.capacity.findMany({
          where: {
            wingId: parent.id,
          },
          select: {
            capacity: true,
          },
        });

        const allocSeats =
          allocatedSeats.length > 0
            ? allocatedSeats
                .map((item) => item.capacity)
                .reduce((total, item) => total + item, 0)
            : 0;

        const count = totalSeats.length - allocSeats;

        return count;
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
