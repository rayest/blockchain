const apiRequest = async (url = "", optionsObj, errMsg = null) => {
    try {
      console.log("request: ", url);
    const response = await fetch(url, { optionsObj });
    if (!response.ok) {
      throw new Error("Please reload the page.");
    }
  } catch (error) {
    console.log(error.message);
    errMsg = error.message;
  } finally {
    return errMsg;
  }
};

export default apiRequest;
