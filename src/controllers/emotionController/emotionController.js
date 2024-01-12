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


///sacar diferencia entre emociones entrada salida.

//sacar la emocion mas frecuente por dia y semana


//happy index , agregado por mes




export default { getallEmotions};