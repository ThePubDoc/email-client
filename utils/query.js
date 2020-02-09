
const build = (key, params) => {
    const queryHead =  `query{` +
        `${key || ""} {`;
    let queryParams = ``; 

    if(params){
        params.forEach((param, index)=>{
            queryParams += `${param} `;
        });
    }
    return queryHead+queryParams+ `}}`;
}

const parse = (res, key)=>{
    let newData; 
    if(key){
        return newData = res.data.data[key]; 
    }
}


module.exports = {
build, parse
}
