package controllers

import "sync"

type roomtable struct {
	//锁
	locak sync.Mutex
	//房间表
	rooms map[string]*PlayerRoom
}

func newRoomTable() *roomtable {
	return &roomtable{rooms: make(map[string]*PlayerRoom)}
}
