const StatusSprite = Object.freeze({
    CLEAN: [0, 0],
    MUSIC: [300, 0],
    LOVE: [200, 0],
    HAPPY: [100, 0],
    BORED: [0, 530],
    ANNOYED: [300, 530],
    FINE: [190, 530],
    SLEEPING: [100, 410],
    ANGRY: [405, 305],
    HUNGRY: [195, 305],
    FINISHED_EATING: [508, 300],
    PLAYING: [0, 200],
    PLAYING2: [300, 200],
    DIRTY: [300, 305],
    DEAD: [100, 100],

    // FAKE STATUS - LOADING
    LOADING: [300, 100]
});

const StatusIds = Object.freeze({
    CLEAN: 'CLEAN',
    MUSIC: 'MUSIC',
    LOVE: 'LOVE',
    HAPPY: 'HAPPY',
    BORED: 'BORED',
    ANNOYED: 'ANNOYED',
    FINE: 'FINE',
    SLEEPING: 'SLEEPING',
    ANGRY: 'ANGRY',
    HUNGRY: 'HUNGRY',
    FINISHED_EATING: 'FINISHED_EATING',
    PLAYING: 'PLAYING',
    PLAYING2: 'PLAYING2',
    DIRTY: 'DIRTY',
    DEAD: 'DEAD'
});

const StatusAction = Object.freeze({
    CLEAN: 'CLEAN',
    MUSIC: 'PLAY MUSIC',
    LOVE: 'MEET LOVER',
    SLEEPING: 'SLEEP',
    FINISHED_EATING: 'EAT',
    PLAYING: 'PLAY'
});

const StatusActionTimeoutAndNextStatus = Object.freeze({
    CLEAN: {timeout: 3000, status: StatusIds.ANNOYED},
    MUSIC: {timeout: 4000, status: StatusIds.BORED},
    LOVE: {timeout: 5000, status: StatusIds.FINE},
    SLEEPING: {timeout: 5000, status: StatusIds.HUNGRY},
    FINISHED_EATING: {timeout: 4000, status: StatusIds.BORED},
    PLAYING: {timeout: 3000, status: StatusIds.PLAYING2},
    PLAYING2: {timeout: 3000, status: StatusIds.DIRTY},
    FINE: {timeout: 3000, status: StatusIds.ANNOYED},
    HUNGRY: {timeout: 10000, status: StatusIds.DEAD},
});

const StatusBackgroundGradient = Object.freeze({
    CLEAN: 'linear-gradient(to bottom, #ffffff, #f6f6f6, #eeeeee, #e5e5e5, #dddddd)',
    MUSIC: 'linear-gradient(to bottom, #000000, #0c0c0c, #151515, #1b1b1b, #222222)',
    LOVE: 'linear-gradient(to bottom, #ee0b0b, #eb0a0a, #e80a09, #e60909, #e30808)',
    HAPPY: 'linear-gradient(to bottom, #ccff99, #c1fe8c, #b4fe7f, #a7fd73, #98fc66)',
    BORED: 'linear-gradient(to bottom, #aea5a5, #b4acac, #bab3b3, #c1baba, #c7c1c1)',
    ANNOYED: 'linear-gradient(to bottom, #aea5a5, #b4acac, #bab3b3, #c1baba, #c7c1c1)',
    FINE: 'linear-gradient(to bottom, #62d47c, #86d671, #a5d769, #c2d865, #dcd865)',
    SLEEPING: 'linear-gradient(to bottom, #050605, #080c06, #0c1006, #121305, #171604)',
    ANGRY: 'linear-gradient(to bottom, #320600, #3f1103, #4a1e03, #532c02, #5a3b01)',
    HUNGRY: 'linear-gradient(to bottom, #e5e4cd, #d2d0b7, #c0bda1, #aeaa8b, #9c9776)',
    FINISHED_EATING: 'linear-gradient(to bottom, #35cb8e, #00bda5, #00adb3, #009bb6, #3089ad)',
    PLAYING: 'linear-gradient(to bottom, #0295c1, #0c89b2, #117da3, #147195, #156586)',
    PLAYING2: 'linear-gradient(to bottom, #0295c1, #0c89b2, #117da3, #147195, #156586)',
    DIRTY: 'linear-gradient(to bottom, #3f626d, #3d5a63, #3b5159, #384950, #354146)',
    DEAD: 'linear-gradient(to bottom, #000000, #000000)'
});

const Status = {
    IDS: StatusIds,
    SPRITE: StatusSprite,
    BG_GRADIENT: StatusBackgroundGradient,
    ACTION: StatusAction,
    TIMEOUTS_AND_NEXT_STATUSES: StatusActionTimeoutAndNextStatus
};

export default Status;