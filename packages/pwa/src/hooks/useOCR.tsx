import { useCallback } from 'react'
import { createWorker, OEM, PSM, ImageLike } from 'tesseract.js'

const useOCR = () => {
  // OCR 识别函数
  const recognizeText = useCallback(async (image: ImageLike) => {
    const worker = await createWorker(['eng', 'chi_sim'], OEM.LSTM_ONLY)
    await worker.setParameters({ tessedit_pageseg_mode: PSM.AUTO_OSD })
    const { data } = await worker.recognize(image)
    await worker.terminate()
    return data.text
  }, [])

  return {
    recognizeText,
  }
}

export default useOCR
