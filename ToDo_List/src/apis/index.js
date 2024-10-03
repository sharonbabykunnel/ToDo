import axios from 'axios';
import Success from '../helpers/Success';
import Failed from '../helpers/Failed';

const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
});

export const getTasksApi = async (id) => {
    try {
        const res = await api.get('/getTasks/' + id)
        console.log(res, "asdgf",);
        return res.data;
    } catch (error) {
        console.log(error)
        Failed(error.response.data.message ? error.response.data.message : error.message);
    }
}

export const getCompletedTasksApi = async (id) => {
    try {
        const res = await api.get('/getCompletedTasks/' + id)
        console.log(res, "asdgf",);
        return res.data;
    } catch (error) {
        console.log(error)
        Failed(error.response.data.message ? error.response.data.message : error.message);
    }
}

export const postTaskApi = async (values,flag) => {
    try {
        if (values.title.trim().length > 0) {
            const date = new Date();
            console.log(
              Number(values.time.split(":").join("")),
              Number("" + date.getHours() + date.getMinutes()),
              parseInt(values.time.split(":").join('')) >
                parseInt(""+date.getHours() + date.getMinutes())
            );
            if (values.time.trim().length > 0 && Number(values.time.split(':').join('')) > Number(""+date.getHours()+date.getMinutes())) {
                console.log(values)
                if (!flag) {
                    const res = await api.post("postTask", values);
                    console.log(res, "sssssss");
                    Success(res.data.message);
                    return res.data;
                } else {
                    Failed("item already exist");
                }
            } else {
                Failed('Enter a valid time')
            }
        } else {
          Failed("enter a task");
        }
    } catch (error) {
        console.log(error)
        Failed(error.response.data.message ? error.response.data.message : error.message);
    }
}

export const editTaskApi = async (values,flag) => {
    try {
        if (values.title.trim().length > 0) {
            if (values.time.trim().length > 0) {
                console.log(values)
                if (!flag) {
                    const res = await api.put("editTask", values);
                    console.log(res, "sssssss");
                    Success(res.data.message);
                    return res.data;
                } else {
                    Failed("item already exist");
                }
            } else {
                Failed('Enter a time')
            }
        } else {
          Failed("enter a task");
        }
    } catch (error) {
        console.log(error)
        Failed(error.response.data.message ? error.response.data.message : error.message);
    }
}

export const deleteTaskApi = async (id) => {
    try {
        const res = await api.delete("deleteTask/"+id);
        console.log(res, "sssssss");
        Success(res.data.message);
        return res.data;
    } catch (error) {
        console.log(error)
        Failed(error.response.data.message ? error.response.data.message : error.message);
    }
}

export const deleteCompletedTaskApi = async (id) => {
    try {
        const res = await api.delete("deleteCompletedTask/"+id);
        console.log(res, "sssssss");
        Success(res.data.message);
        return res.data;
    } catch (error) {
        console.log(error)
        Failed(error.response.data.message ? error.response.data.message : error.message);
    }
}

export const updateTaskApi = async (id, completedOn) => {
  try {
    const res = await api.patch("updateTask", { id, completedOn });
    console.log(res, "sssssss");
    Success(res.data.message);
    return res.data;
  } catch (error) {
    console.log(error);
    Failed(
      error.response.data.message ? error.response.data.message : error.message
    );
  }
};

export const getTaskStatsApi = async (id) => {
  try {
    const res = await api.get("stats/" + id);
    console.log(res, "kkkk");
    Success(res.data?.message);
    return res.data;
  } catch (error) {
    console.log(error);
    Failed(
      error.response.data.message ? error.response.data.message : error.message
    );
  }
};
