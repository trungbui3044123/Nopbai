

class PostsObject {
  constructor(id, title, body, tags, reactions, views, userId, deleteflag) {
    this.id = id;
    this.title = title;
    this.body = body;
    this.tags = tags;
    this.reactions = reactions;
    this.views = views;
    this.userId = userId;
    this.deleteflag = deleteflag;
  }
}

class ThreadChanel {
  constructor(url, localKey, rowPerPageNumber) {
   try{ (this.url = url),
      (this.localKey = localKey),
      (this.rowPerPageNumber =
        Number(rowPerPageNumber) > 0 ? Number(rowPerPageNumber) : 1);
    this.init();
  }catch(e){console.log(`You are in constructor trouble: ${e.message}`)}
  }
  init() {
    this.fetchData().then(()=>{
      
      this.renderTable();
    });
  }
  fetchData() {
    return fetch(this.url)
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        } else {
          throw new Error("Check your API");
        }
      })
      .then((rawdata) => {
        const localData = rawdata.posts.map(
          (row) =>
            new PostsObject(
              row.id,
              row.title,
              row.body,
              row.tags,
              row.reactions,
              row.views,
              row.userId,
              row.deleteflag
            )
        );

        this.setToLocal(localData);
      })
      .catch((e) => alert(`${e.message} : ${e.name}`));
  }
  //
  setToLocal(setLocalArray) {
    localStorage.setItem(this.localKey, JSON.stringify(setLocalArray));
  }
  //
  removeLocal() {
    localStorage.removeItem(this.localKey);
  }
  /**
   *
   * @returns filterData array data để sử dụng khi render html. không trực tiếp return và sử dụng localdata
   */
  getDataLocal() {
    try {
      const dataLocal = JSON.parse(localStorage.getItem(this.localKey));
      if (!dataLocal.length|| Array.isArray(dataLocal) === false) {
        throw new Error("Data local is null");
      }
      return dataLocal;
    } catch (e) {
      console.log(`${e.name}: ${e.message}`);
    }
  }
  /**
   * Truyền vào data from local. 
   * @returns pages=[] đã được phân trang
   */
 renderTable(renderData = [...this.getDataLocal()]||[]){
  const pages=[];
  try{
    if(!renderData.length){return renderData}
    const totalPagesNumbers = Math.ceil(renderData.length/this.rowPerPageNumber)
    for(let i=0;i<totalPagesNumbers;i++){
      const startPoint= i*this.rowPerPageNumber;
      const endPoint= startPoint + this.rowPerPageNumber;
      const currentPage= renderData.slice(startPoint,endPoint);
      pages.push(currentPage);
    }
    return pages;

  }catch(e){ console.log(`You are in renderTable trouble: ${e.message}`)

  }

 }
 ///
 searchData(keyText){
  const renderData = [...this.getDataLocal()]||[];
  const keyTextValue = keyText.toLowerCase().trim()||"";
  // const keyOptionsValue = keyOptions.toLowerCase().trim()||"";
  try{
    if(!keyTextValue.length ){ return this.renderTable(renderData); };
    const searchData = renderData.filter(record=>{
      const searchtitle= record.title.toLowerCase().includes(keyTextValue);
      // const searchTags= record.tags.includes(keyOptions);
      return (searchtitle);
    })
     return this.renderTable(searchData); 

  }catch(e){ console.log(`You are in searchData trouble: ${e.message}`)
 }
}
///
 createData(NewObject){
    const renderData = [...this.getDataLocal()]||[];
    const NewObjectArray = Array(NewObject)||[];

    try{  
      if(!NewObjectArray.length){return }
      NewObject.id=renderData.length+1;
      const  addArray =[...renderData,...NewObjectArray];
      this.setToLocal(addArray) 
      return this.renderTable(addArray); 
    }catch(e){ console.log(`You are in createData trouble: ${e.message}`)
 }}
 ////
 editData(id,editObject){
    const renderData = [...this.getDataLocal()]||[];
    const editObjectArray = Array(editObject)||[];

    try{  
      if(!editObjectArray.length || id<0){return }
      
      const  editIndex = renderData.findIndex(record=>{
        return record.id == id;
      })
     renderData[editIndex]=editObject;
      this.setToLocal(renderData) 
      return this.renderTable(renderData); 
    }catch(e){ console.log(`You are in createData trouble: ${e.message}`)}
  
 }
  deleteData(id){
      const renderData = [...this.getDataLocal()]||[];
       try{  
      if(id<0){return }
      
      const  deleteIndex = renderData.findIndex(record=>{
        return record.id == id;
      })
     renderData.splice(deleteIndex,1)
      this.setToLocal(renderData) 
      return this.renderTable(renderData); 
    }catch(e){ console.log(`You are in createData trouble: ${e.message}`)} 
  }




}

//


url="https://dummyjson.com/posts";
localKey="TrungbuiThread";
rowPerPageNumber= 3;

const thread = new ThreadChanel(url, localKey, rowPerPageNumber);

