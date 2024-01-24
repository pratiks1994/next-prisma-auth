export const updateTaskQueryBuilder = (req) => {
    let baseTaskUpdateQuery = { where: { id: req.id }, data: {} };

    if(req.hasOwnProperty('status')){
        baseTaskUpdateQuery.data.status = req.status
    }
    if(req.hasOwnProperty("task")){
        baseTaskUpdateQuery.data.task = req.task
    }

    return baseTaskUpdateQuery
};
