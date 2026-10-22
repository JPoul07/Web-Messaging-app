const EventEmitter = require("events")
const fs = require("fs")

class HauntedMansion extends EventEmitter {
    enterRoom(name, room) {
        console.log(`\n${name} enters the ${room}`)
        this.emit("enterRoom", name, room)
    }

    scare(name, room) {
        console.log(`Boo! ${name} has been scared in the ${room}`)
        this.emit("scare", name, room)
        
    }

    exit(name, room) {
        console.log(`${name} exits the ${room} safely`)
        this.emit("exit", name, room)
    }

}

let hauntedMansion = new HauntedMansion()

let scareCount = {
    "humans": 0,
    "monsters": 0
} 

let humans = ["Molly", "Kerri", "Alec", "Sheridan"]

let roomCount = {}

hauntedMansion.on("enterRoom", (name, room) => {
    hauntedMansion.scare(name, room)
})

hauntedMansion.on("enterRoom", (name, room) => {
    const time = new Date().getTime()
    const data = `${time}: ${name} entered the ${room}\n`
    fs.appendFileSync("./mansion.log", data)

})

hauntedMansion.on("scare", (name, room) => {
    if (humans.includes(name)) {
        scareCount.humans ++
    } else {
        scareCount.monsters ++
    }

    if (roomCount[room] == undefined) {
        roomCount[room] = 0
    }
    roomCount[room] ++
})

hauntedMansion.once("enterRoom", (name, room) => {
    console.log(`A ghost appears for the first visitor: ${name}, in the ${room}`)
})

function monsterScareListener(name, room) {
    if (!(humans.includes(name))) {
        console.log(`${name} waits in the ${room} for unsuspecting prey`)
        hauntedMansion.removeListener("scare", monsterScareListener)
    }
}

hauntedMansion.on("scare", monsterScareListener)

hauntedMansion.once("exit", () => {
    console.log(`\nFinal Scare Count: ${JSON.stringify(scareCount).replaceAll('"', '').split(',').join(', ').split(':').join(': ')}`)
    console.log(`\nFinal Room count: ${JSON.stringify(roomCount).replaceAll('"', '').split(',').join(", ").split(':').join(': ')}`)
})

hauntedMansion.enterRoom("Molly", "Foyer")
hauntedMansion.enterRoom("Dracula", 'Library')
hauntedMansion.enterRoom("Kerri", "Library")
hauntedMansion.enterRoom("Medusa", "Bathroom")
hauntedMansion.enterRoom("Alec", "Kitchen")
hauntedMansion.enterRoom("Frankenstein", "Hallway")
hauntedMansion.enterRoom("Sheridan", "Basement")
hauntedMansion.exit("Molly", "Foyer")
hauntedMansion.exit("Dracula", "Library")
hauntedMansion.exit("Kerri", "Library")
hauntedMansion.exit("Medusa", "Bathroom")
hauntedMansion.exit("Alec", "Kitchen")
hauntedMansion.exit("Frankestein", "Hallway")
hauntedMansion.exit("Sheridan", "Basement")

