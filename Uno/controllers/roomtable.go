package controllers

import (
	"log"
	"sync"
)

type roomtable struct {
	//锁
	lock sync.Mutex
	//房间表
	rooms map[string]*PlayerRoom
}

//初始化房间表
func newRoomTable() *roomtable {
	return &roomtable{rooms: make(map[string]*PlayerRoom)}
}

//检测房间号是否存在
func (rt *roomtable) CheckRoom(roomname string, roompassword string) bool {
	rt.lock.Lock()
	defer rt.lock.Unlock()
	r := rt.rooms[roomname]
	if r.player_room.room_name == roomname && r.player_room.room_password == roompassword {
		return true
	} else {
		return false
	}
}

//创建房间
func (rt *roomtable) CreateRoom(roomname string, roompassword string) {
	rt.lock.Lock()
	defer rt.lock.Unlock()
	roommsg := Room{room_name: roomname, room_password: roompassword}
	//player := NewPlayer(ws,playerid,playername,roomname)
	rt.rooms[roomname] = NewRoom(roommsg, 4)
	log.Printf("已经创建了 %s 房间",roomname)
}

//删除房间
func (rt *roomtable) RemoveRoom(roomname string){
	rt.lock.Lock()
	defer rt.lock.Unlock()
	delete(rt.rooms,roomname)
	log.Printf("已经将 %s 房间删除",roomname)
}
