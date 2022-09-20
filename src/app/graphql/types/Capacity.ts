import { objectType, extendType, inputObjectType, nonNull } from "nexus";

export const Capacity = objectType({
  name: "Capacity",
  definition(t) {
    t.nonNull.string("id", { description: "ID of the Seat" });
    t.nonNull.date("createdAt", { description: "Created Date" });
    t.nonNull.string("divisionId", { description: "Division ID" });
    t.nonNull.string("buildingId", { description: "Building ID" });
    t.nonNull.string("floorId", { description: "Floor ID" });
    t.nonNull.string("wingId", { description: "Wing ID" });
    t.nonNull.int("capacity", { description: "Capacity" });
    t.field("division", {
      description: "Division Details",
      type: "Division",
      async resolve(parent, _args, { prisma }) {
        return await prisma.division.findUnique({
          where: {
            id: parent.divisionId,
          },
        });
      },
    });
    t.field("building", {
      description: "Building Details",
      type: "Building",
      async resolve(parent, _args, { prisma }) {
        return await prisma.building.findUnique({
          where: {
            id: parent.buildingId,
          },
        });
      },
    });
    t.field("floor", {
      description: "Floor Details",
      type: "Floor",
      async resolve(parent, _args, { prisma }) {
        return await prisma.floor.findUnique({
          where: {
            id: parent.floorId,
          },
        });
      },
    });
    t.field("wing", {
      description: "Wing Details",
      type: "Wing",
      async resolve(parent, _args, { prisma }) {
        return await prisma.wing.findUnique({
          where: {
            id: parent.wingId,
          },
        });
      },
    });
    t.field("assignedCapacity", {
      description: "Assigned Capacity",
      type: "Int",
      async resolve(_parent, _args, { prisma }) {
        const data = await prisma.capacity.aggregate({
          _sum: { capacity: true },
        });

        return data._sum.capacity;
      },
    });
  },
});

export const CapacityQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.nonNull.field("capacity", {
      type: "Capacity",
      description: "Get all Capacity details",
      resolve(_parent, _args, { prisma }) {
        return prisma.capacity.findMany();
      },
    });
  },
});

export const CapacityInputType = inputObjectType({
  name: "CapacityInputType",
  definition(t) {
    t.nonNull.string("divisionId");
    t.nonNull.string("buildingId");
    t.nonNull.string("floorId");
    t.nonNull.string("wingId");
    t.nonNull.int("capacity");
  },
});

export const CapacityMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("createCapacity", {
      type: "Capacity",
      args: { data: nonNull(CapacityInputType) },
      async resolve(
        _parent,
        { data: { divisionId, buildingId, floorId, wingId, capacity } },
        { prisma }
      ) {
        return await prisma.capacity.create({
          data: {
            divisionId,
            buildingId,
            floorId,
            wingId,
            capacity,
          },
        });
      },
    });
  },
});
