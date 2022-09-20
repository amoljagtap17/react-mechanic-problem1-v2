import { objectType, extendType } from "nexus";

export const Seat = objectType({
  name: "Seat",
  definition(t) {
    t.nonNull.string("id", { description: "ID of the Seat" });
    t.nonNull.string("seatNumber", { description: "Seat Number" });
    t.nonNull.date("createdAt", { description: "Created Date" });
  },
});

export const SeatQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.nonNull.field("seats", {
      type: "Seat",
      description: "Get all Seats details",
      resolve(_parent, _args, { prisma }) {
        return prisma.seat.findMany();
      },
    });
    t.nonNull.int("seatCount", {
      description: "Get all Seats count",
      resolve(_parent, _args, { prisma }) {
        return prisma.seat.count();
      },
    });
  },
});
