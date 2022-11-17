import { soundEffects } from "./soundEffects"

export const onAttackSoundEffect = (id) => {
    switch (id) {
        case 2:
            soundEffects.ayanokouji.play();
            break;
        case 3:
            soundEffects.minatoAttack.play();
            break;
        case 4:
            soundEffects.erwinSusume.play();
            break;
        case 5:
            soundEffects.gintoki.play();
            break;
        case 10:
            soundEffects.luffy.play();
            break;
        case 12:
            soundEffects.mobAttack.play();
            break;
        case 14:
            soundEffects.sakamotoAttack.play();
            break;
        case 15:
            soundEffects.subaru.play();
            break;
        case 16:
            soundEffects.yuno.play();
            break;
        case 17:
            soundEffects.zoroAttack.play();
            break;
        default:
            break;
    }
}