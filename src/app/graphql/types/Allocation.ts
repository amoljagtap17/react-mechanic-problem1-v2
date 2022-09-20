import {
  objectType,
  extendType,
  inputObjectType,
  nonNull,
  stringArg,
} from "nexus";

export const Allocation = objectType({
  name: "Allocation",
  definition(t) {
    t.nonNull.string("id", { description: "ID of the Seat" });
    t.nonNull.date("createdAt", { description: "Created Date" });
    t.nonNull.string("departmentId", { description: "Department ID" });
    t.nonNull.string("buildingId", { description: "Building ID" });
    t.nonNull.string("floorId", { description: "Floor ID" });
    t.nonNull.string("wingId", { description: "Wing ID" });
    t.nonNull.int("capacity", { description: "Capacity" });
    t.field("department", {
      description: "Department Details",
      type: "Department",
      async resolve(parent, _args, { prisma }) {
        return await prisma.department.findUnique({
          where: {
            id: parent.departmentId,
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
    t.field("assignedAllocation", {
      description: "Assigned Allocation",
      type: "Int",
      async resolve(_parent, _args, { prisma }) {
        const data = await prisma.allocation.aggregate({
          _sum: { capacity: true },
        });

        return data._sum.capacity;
      },
    });
  },
});

export const AllocationQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.nonNull.field("allocations", {
      type: "Allocation",
      description: "Get all Allocation details",
      resolve(_parent, _args, { prisma }) {
        return prisma.allocation.findMany();
      },
    });
  },
});

export const AllocationInputType = inputObjectType({
  name: "AllocationInputType",
  definition(t) {
    t.nonNull.string("departmentId");
    t.nonNull.string("buildingId");
    t.nonNull.string("floorId");
    t.nonNull.string("wingId");
    t.nonNull.int("capacity");
  },
});

export const AllocationMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("createAllocation", {
      type: "Allocation",
      args: { data: nonNull(AllocationInputType) },
      async resolve(
        _parent,
        { data: { departmentId, buildingId, floorId, wingId, capacity } },
        { prisma }
      ) {
        return await prisma.allocation.create({
          data: {
            departmentId,
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
