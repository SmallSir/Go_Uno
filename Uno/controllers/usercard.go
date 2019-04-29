package controllers

type UserCard struct {
	cards  []Card
	number int
}

//手牌排序
func (user *UserCard) Sort() {
	user.QuickSort(0, user.number-1)
}

//快排
func (user *UserCard) QuickSort(l, r int) {
	if l >= r {
		return
	}
	mid := user.cards[(l+r)/2]
	x := l
	y := r
	for x < y {
		for user.Compare(user.cards[x], mid) {
			x++
		}
		for user.Compare(mid, user.cards[y]) {
			y--
		}
		if x <= y {
			tmp := user.cards[x]
			user.cards[x] = user.cards[y]
			user.cards[y] = tmp
			x++
			y--
		}
	}
	user.QuickSort(l, y)
	user.QuickSort(x, r)
}

//两张牌比大小
func (user *UserCard) Compare(x Card, y Card) bool {
	//两张牌颜色相同
	if x.Color == y.Color {
		//如果x为功能牌
		if x.Number == "-1" {
			//如果y为功能牌
			if y.Number == "-1" {
				return x.State < y.State
				//如果y不是功能牌
			} else {
				return false
			}
			//如果x不是功能牌
		} else {
			//如果y是功能牌
			if y.Number == "-1" {
				return true
				//如果y不是功能牌可以直接比较
			} else {
				return x.Number < y.Number
			}
		}
		//两张牌颜色不同
	} else {
		return x.Color < y.Color
	}
}

//二分查找
func (user *UserCard) BinaryInsert(new_card Card) int {
	l := -1
	r := user.number - 1
	for l < r-1 {
		mid := (l + r) / 2
		check := user.Compare(user.cards[mid], new_card)
		if check {
			l = mid
		} else {
			r = mid
		}
	}
	return r
}

//添加新牌
func (user *UserCard) Insert_Card(newcards []Card) {
	for _, new_card := range newcards {
		r := user.BinaryInsert(new_card)
		new_cards := make([]Card, 0, len(user.cards)+1)
		new_cards = append(new_cards, user.cards[:r]...)
		new_cards = append(new_cards, new_card)
		new_cards = append(new_cards, user.cards[r:]...)
		user.cards = new_cards
		user.number += 1
	}
}

//移除牌
func (user *UserCard) Remove_Card(oldcard Card) {
	r := user.BinaryInsert(oldcard)
	new_cards := make([]Card, 0, user.number-1)
	new_cards = append(user.cards[:r], user.cards[r+1:]...)
	user.cards = new_cards
	user.number -= 1
}
