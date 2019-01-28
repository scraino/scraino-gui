import musicImage from './music.png'
import penImage from './pen.png'
import videoImage from './video-sensing.png'
import translateImage from './translate.png'
import arduinoImage from './arduino.png'
import nanoImage from './nano.png'
import edoImage from './edo.png'
import esp32Image from './esp32.png'
import devkitcImage from './devkitc.png'
import gkduinoImage from './gkduino.png'
import imakeeduImage from './imakeedu.png'
import nanobeeImage from './nanobee.png'
import aprobotImage from './aprobot.png'

export default [
    {
        name: 'Arduino',
        extensionId: 'arduino',
        iconURL: arduinoImage,
        description: 'Uno官方',
        featured: true,
        peripheral: true
    },
    {
        name: 'Arduino',
        extensionId: 'nano',
        iconURL: nanoImage,
        description: 'Nano扩展',
        featured: true,
        peripheral: true
    },
    {
        name: 'ESP32',
        extensionId: 'espduino',
        iconURL: esp32Image,
        description: 'Arduino扩展',
        featured: true,
        peripheral: true
    },
    {
        name: 'ESP32',
        extensionId: 'epython',
        iconURL: esp32Image,
        description: 'MicroPython扩展',
        featured: true,
        peripheral: true
    },
    {
        name: 'DevKitC',
        extensionId: 'esp32',
        iconURL: devkitcImage,
        description: 'Arduino扩展',
        featured: true,
        peripheral: true
    },
    {
        name: 'DevKitC',
        extensionId: 'pyesp32',
        iconURL: devkitcImage,
        description: 'MicroPython扩展',
        featured: true,
        peripheral: true
    },
    {
        name: 'EDO-Robot-B',
        extensionId: 'edo',
        iconURL: edoImage,
        description: 'Arduino扩展',
        featured: true,
        peripheral: true
    },
    {
        name: 'GKduino',
        extensionId: 'gkduino',
        iconURL: gkduinoImage,
        description: 'Arduino扩展',
        featured: true,
        peripheral: true
    },
    {
        name: 'Imakeedu',
        extensionId: 'imakeedu',
        iconURL: imakeeduImage,
        description: 'Arduino扩展',
        featured: true,
        peripheral: true
    },
    {
        name: 'Nanobee',
        extensionId: 'nanobee',
        iconURL: nanobeeImage,
        description: 'Arduino扩展',
        featured: true,
        peripheral: true
    },
    {
        name: 'Aprobot',
        extensionId: 'aprobot',
        iconURL: aprobotImage,
        description: 'Arduino扩展',
        featured: true,
        peripheral: true
    },
    {
        name: '音乐',
        extensionId: 'music',
        iconURL: musicImage,
        description: '演奏乐器，敲锣打鼓。',
        featured: true
    },
    {
        name: '画笔',
        extensionId: 'pen',
        iconURL: penImage,
        description: '绘制角色。',
        featured: true
    },
    {
        name: '翻译',
        extensionId: 'translate',
        iconURL: translateImage,
        description: '把文字翻译成多种语言。',
        featured: true
    },
    {
        name: '视频侦测',
        extensionId: 'videoSensing',
        iconURL: videoImage,
        description: '使用摄像头侦测运动。',
        featured: true
    }
]
