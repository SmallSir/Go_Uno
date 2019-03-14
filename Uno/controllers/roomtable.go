package controllers

import "sync"

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
func (rt *roomtable) CheckRoom(roomname string) bool{
	rt.lock.Lock()
	defer rt.lock.Unlock()

	r := rt.rooms[roomname]
	if r == nil{
		return false
	}
	return true
}

//创建房间
func (rt *roomtable) CreateRoom(roomname string roompassword,rwc{
	rt.lock.Lock()
	defer rt.lock.Unlock()


}
