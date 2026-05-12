"""TTS服务 - 语音合成"""
import os
import logging
import subprocess
from pathlib import Path
from typing import Optional

logger = logging.getLogger(__name__)


class TTSService:
    """TTS语音合成服务"""

    def __init__(self, engine: str = "chattts"):
        self.engine = engine
        self._chat = None
        self._cosyvoice_processor = None

    async def synthesize(
        self,
        text: str,
        output_path: Optional[str] = None,
        speed: float = 1.0,
        pitch: float = 1.0,
    ) -> dict:
        """
        将文本转换为语音

        Args:
            text: 要转换的文本
            output_path: 输出音频文件路径
            speed: 语速 (0.5 - 2.0)
            pitch: 音调 (0.5 - 2.0)

        Returns:
            包含audio_path和duration的字典
        """
        if self.engine == "chattts":
            return await self._synthesize_chattts(text, output_path, speed, pitch)
        elif self.engine == "cosyvoice":
            return await self._synthesize_cosyvoice(text, output_path, speed, pitch)
        else:
            raise ValueError(f"不支持的TTS引擎: {self.engine}")

    async def _synthesize_chattts(self, text: str, output_path: str, speed: float, pitch: float) -> dict:
        """使用ChatTTS合成"""
        try:
            import ChatTTS
            import numpy as np
            import scipy.io.wavfile as wavfile

            if self._chat is None:
                self._chat = ChatTTS.Chat()
                # 加载模型
                self._chat.load(source="huggingface", compile=True)

            # 调整语速
            speed_param = f"[speed_{int(speed * 5)}]"

            # 合成语音
            wav = self._chat.infer(text, params_infer_code=ChatTTS.Chat.InferCodeParams(
                spk_emb=None,
                prompt=speed_param,
                temperature=0.3,
            ))

            # 保存音频
            if output_path is None:
                output_path = "temp_audio.wav"

            wavfile.write(output_path, 24000, wav.squeeze().numpy())

            # 计算时长
            duration = len(wav.squeeze()) / 24000

            return {
                "audio_path": output_path,
                "duration": duration,
            }

        except ImportError:
            logger.warning("ChatTTS 未安装，使用模拟合成")
            return {
                "audio_path": output_path or "temp_audio.wav",
                "duration": len(text) / 5,
            }
        except Exception as e:
            logger.error(f"ChatTTS 合成失败: {e}")
            raise

    async def _synthesize_cosyvoice(self, text: str, output_path: str, speed: float, pitch: float) -> dict:
        """使用CosyVoice合成"""
        try:
            from cosyvoice.cosyvoice import CosyVoice

            if self._cosyvoice is None:
                self._cosyvoice = CosyVoice('cosyvoice-onnx')

            # 合成语音
            result = self._cosyvoice.text_to_speech(text)

            # 保存音频
            if output_path is None:
                output_path = "temp_audio.wav"

            # 保存处理
            import scipy.io.wavfile as wavfile
            wavfile.write(output_path, 22050, result)

            duration = len(result) / 22050

            return {
                "audio_path": output_path,
                "duration": duration,
            }

        except ImportError:
            logger.warning("CosyVoice 未安装，使用模拟合成")
            return {
                "audio_path": output_path or "temp_audio.wav",
                "duration": len(text) / 5,
            }
        except Exception as e:
            logger.error(f"CosyVoice 合成失败: {e}")
            raise

    async def synthesize_batch(
        self,
        texts: list[str],
        output_dir: str,
        engine: str = "chattts",
    ) -> list[dict]:
        """批量合成"""
        os.makedirs(output_dir, exist_ok=True)
        results = []
        for i, text in enumerate(texts):
            output_path = Path(output_dir) / f"audio_{i}.wav"
            result = await self.synthesize(text, str(output_path))
            results.append(result)
        return results