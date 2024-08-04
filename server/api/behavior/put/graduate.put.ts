export default defineEventHandler(async (event) => {
    const {
      id,
    } = await readBody(event);
    
    const res = await event.context.prisma.behavior.update({
        where: {
            id: id,
        },
        data: {
            graduated: new Date(),
        }
    }) 

    return {
      statusCode: 200,
      body: res ? res : [],
    };
  });
  