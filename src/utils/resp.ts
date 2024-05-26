const resp = (status: number, message: unknown) => ({status, message});

const respM = (status: number, message: unknown) => ({status, message:{ message }});

export {resp, respM}