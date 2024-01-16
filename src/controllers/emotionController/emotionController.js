import emotionModel from "../../models/emotionModel.js";
/// get day -1 entrada, salida y total



  

  const getallEmotions = async () => {
    try {
      const emotions = await emotionModel.find().exec();
  
      return emotions;
    } catch (e) {
      console.error(e);
      return false;
    }
  };


// get all emotions by userid
const getEmotionsByUserId = async (userId, registerTime) => {
  try {
    const emotions = await emotionModel.find({ userId }).exec();

    if (!emotions || emotions.length === 0) {
      return false;
    }

    const userEmotions = await filterToday(emotions);

    // filter by emotionType
    if (registerTime) {
      const filteredEmotions = userEmotions.filter((emotion) => {
        return emotion.registerTime === registerTime;
      });
      /* console.log("filteredEmotions", filteredEmotions);
      console.log(registerTime); */

      return filteredEmotions.length !== 0;
    }
  } catch (e) {
    console.error(e);
    return false;
  }
};



//register emotion  
const registerEmotion = async (userId, emotionType, registerTime) => {
  try {
    const emotion = new emotionModel({ userId, emotionType, registerTime });
    const emotionSaved = await emotion.save();
    return emotionSaved;
  } catch (e) {
    console.error(e);
    return false;
  }
}


//remove all emotions

const removeAllEmotions = async () => {
  try {
    await emotionModel.deleteMany({});
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
}


const filterToday = (emotions) => {
  const today = new Date();
  const todayString = today.toISOString().split("T")[0];
  const todayEmotions = emotions.filter(
    (emotion) => emotion.date.toISOString().split("T")[0] === todayString
  );

  return todayEmotions;
};

export default { getallEmotions, getEmotionsByUserId, registerEmotion, removeAllEmotions};