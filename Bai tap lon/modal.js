

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
    (this.url = url),
      (this.localKey = localKey),
      (this.rowPerPageNumber =
        Number(rowPerPageNumber) > 0 ? Number(rowPerPageNumber) : 1);
    this.init();
  }
 async  init() {
    this.fetchData();
    await  this.getDataLocal();
    await  this.renderData(this.filterData);
    
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

  //
  setfilterData(cloneArray) {
    try {
      if (!Array.isArray(cloneArray) && cloneArray.length == 0) {
        throw new Error("cloneArray is null, can not create filterData");
      }
      return (this.filterData = [...cloneArray]);
    } catch (e) {
      console.log(`${e.name}: ${e.message}`);
    }
  }
  clearFilterData() {
    return (this.filterData = []);
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
      return this.setfilterData(dataLocal);
    } catch (e) {
      console.log(`${e.name}: ${e.message}`);
    }
  }
  //
  /**
   *
   * @param {*} targetRenderArray default la filterData, con khong thi la cac data tu search,add,edit,delete tryen vao
   * @returns 1 mang tap hop cac page da pagination, this.renderData(targetRenderArray) => this.pages[]
   *Hoac tra ve mang rong de show nodata
   */
  renderData(targetRenderArray = this.filterData) {
    this.getDataLocal();

    this.pages = [];
    try {
      if (!Array.isArray(targetRenderArray) ) {
        throw new Error("inputData targetRenderArray is null");
      }
      if (!targetRenderArray.length) {
        return (this.pages = []);
      }
      const totalPages = Math.ceil(
        targetRenderArray.length / this.rowPerPageNumber
      );
      for (let i = 0; i < totalPages; i++) {
        const startIndex = i * this.rowPerPageNumber;
        const endIndex = startIndex + this.rowPerPageNumber;
        const page = targetRenderArray.slice(startIndex, endIndex);
        this.pages.push(page);
      }
      return this.pages;
    } catch (e) {
      console.log(`${e.name}:${e.message}`);
    }
  }
  //
  /**
   *
   * @param {String} searchKey String truyen truc tiep vao tu html, goi this.searchData(searchKey) o class UI
   * @returns this.pages[] chua cac value search va da duoc pagination
   */
  searchData(searchKey) {
    let data = this.getDataLocal();
    const value = searchKey.toLowerCase().trim();
    if (searchKey.length === 0) {
      return data=[];
    }
    const searchValue = data.filter((row) => {
      if (!row.title || !row.body || !Array.isArray(row.tags)) {
        return false;
      }
      const titleSearch = row.title.toLowerCase().includes(value); // true/false
      const bodySearch = row.body.toLowerCase().includes(value); // true/false
      const tagSearch = row.tags.some((record) => {
        record.toLowerCase().includes(value);
      }); // true/false\
      return titleSearch || bodySearch || tagSearch;
    });
    return this.renderData(searchValue);
  }
  //
  validateData() {}
  /**
   *
   * @param {NewObject} newPostsObject
   * khi su dung thi lay ra this.pages[] chua cac value search va da duoc pagination
   */
  addData(newPostsObject) {
    const data = this.getDataLocal();

    try {
      if (
        Object.values(newPostsObject).some((val) => val === "" || val === null)
      ) {
        throw new Error("Can not leave whole informations in blank");
      }
      newPostsObject.id = data.length + 1;
      const newdataList = [...data, newPostsObject];
      this.removeLocal();
      this.setToLocal(newdataList);

      return this.renderData();
    } catch (e) {
      console.log(`${e.message}`);
    }
  }
  editData(editObject) {
    const data = this.getDataLocal();
    const ifeditObjectYesNo = data.some((row) => {
      return row.id == editObject.id;
    });

    try {
      if ((editObject.id == -1, !ifeditObjectYesNo)) {
        throw new Error("No such data to edit");
      }
      const targeteditObject = data.filter((row) => {
        return row.id == editObject.id;
      });
      const targeteditIndex = data.findIndex((row) => {
        return row.id == editObject.id;
      });
      data[targeteditIndex] = targeteditObject;
      const editLists = [...data];
      this.removeLocal();
      this.setfilterData(editLists);
      return this.renderData();
    } catch (e) {
      console.log(`${e.message}`);
    }
  }
  deleteData(objectID) {
    this.getDataLocal();
    const data = this.filterData;
    const confirmdelte=confirm("Wanna delete this for real Nigga");
    try {
      if ((editObject.id === -1)) {
        throw new Error("No such data to delete");
      }
      if (!confirmdelte) {return}
      
      const deletedData = data.filter((row) => {
        return row.id != objectID;
      });

      this.removeLocal();
      console.log(deletedData);
      this.setToLocal(deletedData);
      return deletedData;
    } catch (e) {
      console.log(`${e.message}`);
    }
  }
}
//
url = "https://dummyjson.com/posts";
localKey = "TrungbuiThread";
rowPerPageNumber = 3;

window.thread = new ThreadChanel(url, localKey, rowPerPageNumber);
