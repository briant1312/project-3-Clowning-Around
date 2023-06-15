import sadhonkfile from '../audio/sadhonk.mp3'

const honk = new Audio("http://www.bubbasmonkey.com/COWS/bikehorn.wav")
const sadhonk = new Audio(sadhonkfile)
sadhonk.playbackRate = 2

export default function useSounds() {
    return {
        bikeHornSound: () => {
            honk.play()
        },
        sadHonkSound: () => {
            sadhonk.play()
        }
    }
}