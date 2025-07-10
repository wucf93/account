// src/hooks/useOCR.js
import { useCallback } from 'react'
import { createWorker, OEM, PSM } from 'tesseract.js'

const useOCR = () => {

  // OCR 识别函数
  const recognizeText = useCallback(async (image: any) => {
    const worker = await createWorker(['eng', 'chi_sim'], OEM.LSTM_ONLY)
    await worker.setParameters({ tessedit_pageseg_mode: PSM.AUTO_OSD })
    const { data } = await worker.recognize(image)
    console.log(data.text)
    await worker.terminate()
  }, [])

  return {
    recognizeText,
  }
}

export default useOCR
