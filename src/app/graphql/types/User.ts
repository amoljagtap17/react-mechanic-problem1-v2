import { objectType, extendType } from "nexus";

export const User = objectType({
  name: "User",
  definition(t) {
    t.nonNull.string("id", { description: "ID of the user" });
    t.string("name", { description: "Name of the user" });
    t.string("email", { description: "Email of the user" });
    t.string("image", { description: "Image of the user" });
    t.nonNull.date("createdAt", { description: "Created Date" });
    t.date("emailVerified", { description: "Email verified Date" });
    t.nonNull.string("role", {
      description: "Role for the user",
    });
    t.field("department", {
      description: "Department Info",
      type: "Department",
      async resolve(parent, _args, { prisma }) {
        return await prisma.user
          .findUnique({
            where: {
              id: parent.id,
            },
          })
          .department();
      },
    });
  },
});

export const UserQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.nonNull.field("users", {
      type: "User",
      resolve(_parent, _args, { prisma }) {
        return prisma.user.findMany();
      },
    });

    t.nonNull.list.nonNull.field("super_users", {
      type: "User",
      resolve(_parent, _args, { prisma }) {
        return prisma.user.findMany({
          where: {
            role: {
              not: "USER",
            },
          },
        });
      },
    });
  },
});
