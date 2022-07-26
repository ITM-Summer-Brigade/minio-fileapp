// Prisma
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const { createBucket, getBucketUrl } = require("../minio");
const { findSubject } = require("./subject.model");

const findAllClasses = async () => {
  return await prisma.class.findMany({});
};

const findClassesBySubject = async (subjectID) => {
  return await prisma.class.findMany({
    where: {
      subjectID: parseInt(subjectID),
    },
  });
};

const findClassById = async (classId) => {
  return await prisma.class.findUnique({
    where: {
      id: parseInt(classId),
    },
  });
};

const findClass = async (classUrl) => {
  return await prisma.class.findUnique({
    where: {
      classUrl,
    },
  });
};

const createClass = async (
  className,
  classUrl,
  teacherName,
  subjectName,
  creatorEmail
) => {
  const bucketName = createBucket(className);
  const subject = await findSubject(subjectName);
  return await prisma.class.create({
    data: {
      className,
      classUrl: classUrl || "",
      teacherName: teacherName || "",
      bucket: {
        create: {
          bucketName: bucketName,
        },
      },
      subjectID: subject.id,
      creatorName: {
        connect: { email: creatorEmail },
      },
    },
  });
};

const removeClass = async (classUrl) => {
  return await prisma.class.delete({
    where: {
      classUrl,
    },
  });
};

module.exports = {
  findAllClasses,
  createClass,
  findClass,
  findClassesBySubject,
  findClassById,
  removeClass,
};
