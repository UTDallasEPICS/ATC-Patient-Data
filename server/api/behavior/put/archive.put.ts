export default defineEventHandler(async (event) => {
    const {
      id,
      archive,
    } = await readBody(event);
    
    const res = await event.context.prisma.behavior.update({
        where: {
            id: id,
        },
        data: {
            archive: archive,
        }
    }) 

    return {
      statusCode: 200,
      body: res ? res : [],
    };
  });
  