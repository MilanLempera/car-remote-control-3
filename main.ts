function coordsToDirection (x: number, y: number) {
    if (x > 0) {
        if (y > 0) {
            return ArrowNames.NorthEast
        } else if (y < 0) {
            return ArrowNames.SouthEast
        } else {
            return ArrowNames.East
        }
    } else if (x < 0) {
        if (y > 0) {
            return ArrowNames.NorthWest
        } else if (y < 0) {
            return ArrowNames.SouthWest
        } else {
            return ArrowNames.West
        }
    } else {
        if (y > 0) {
            return ArrowNames.North
        } else if (y < 0) {
            return ArrowNames.South
        }
        return 10
    }
}
radio.onReceivedValue(function (name, value) {
    wuKong.setLightMode(wuKong.LightMode.BREATH)
    if (name == "x") {
        xInput = value
    } else if (name == "y") {
        yInput = value
    } else if (name == "b") {
        if (value != 0) {
            button = value
        } else {
            button = 10
        }
    }
    direction = coordsToDirection(xInput, yInput)
    speed = coordsToSpeed(xInput, yInput)
    go(direction, speed)
})
function coordsToSpeed (x: number, y: number) {
    return Math.max(Math.abs(x), Math.abs(y)) * 50
}
function go (direction: number, speed: number) {
    if (speed > 0) {
        if (direction == ArrowNames.North) {
            wuKong.mecanumRun(wuKong.RunList.Front, speed)
        } else if (direction == ArrowNames.NorthEast) {
            wuKong.mecanumRun(wuKong.RunList.RightFront, speed)
        } else if (direction == ArrowNames.East) {
            wuKong.mecanumRun(wuKong.RunList.right, speed)
        } else if (direction == ArrowNames.SouthEast) {
            wuKong.mecanumRun(wuKong.RunList.RightRear, speed)
        } else if (direction == ArrowNames.South) {
            wuKong.mecanumRun(wuKong.RunList.rear, speed)
        } else if (direction == ArrowNames.SouthWest) {
            wuKong.mecanumRun(wuKong.RunList.LeftRear, speed)
        } else if (direction == ArrowNames.West) {
            wuKong.mecanumRun(wuKong.RunList.left, speed)
        } else if (direction == ArrowNames.NorthWest) {
            wuKong.mecanumRun(wuKong.RunList.LeftFront, speed)
        }
    } else if (button > 0) {
        if (button == 1) {
            wuKong.mecanumSpin(wuKong.TurnList.Right, 50)
        } else if (button == 2) {
            wuKong.mecanumSpin(wuKong.TurnList.Right, 100)
        } else if (button == 3) {
            wuKong.mecanumSpin(wuKong.TurnList.Left, 50)
        } else if (button == 4) {
            wuKong.mecanumSpin(wuKong.TurnList.Left, 100)
        } else if (button == 5) {
            wuKong.mecanumDrift(wuKong.TurnList.Left)
        } else if (button == 6) {
            wuKong.mecanumDrift(wuKong.TurnList.Right)
        } else {
            wuKong.mecanumStop()
            wuKong.mecanumRun(wuKong.RunList.stop, 0)
            button = 0
        }
    } else {
        wuKong.mecanumStop()
        wuKong.mecanumRun(wuKong.RunList.stop, 0)
    }
}
let speed = 0
let direction = 0
let button = 0
let yInput = 0
let xInput = 0
basic.showIcon(IconNames.Chessboard)
radio.setGroup(1)
wuKong.mecanumWheel(
wuKong.ServoList.S0,
wuKong.ServoList.S2,
wuKong.ServoList.S1,
wuKong.ServoList.S3
)
basic.showIcon(IconNames.Butterfly)
