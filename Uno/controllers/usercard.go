package controllers

type UserCard struct {
	cards  []Card
	number int
}

func (user *UserCard) Sort() {
	
}

//二分查找
func (user *UserCard) BinaryInsert(new_card Card) int{
	l := 0
	r := user.number - 1
	for l < r-1 {
		mid := (l + r) / 2
		//如果颜色相同
		if user.cards[mid].color == new_card.color {
			//如果新牌他是状态牌
			if new_card.number == "-1" {
				//如果mid位置也是状态牌
				if user.cards[mid].number == "-1" {
					//比状态牌大小
					if user.cards[mid].state < new_card.state {
						l = mid
					} else {
						r = mid
					}
					//如果mid位置不是状态牌
				} else {
					l = mid
				}
				//新牌不是状态牌
			} else {
				//mid位置是状态牌或他的点数比新牌大
				if user.cards[mid].number == "-1" || user.cards[mid].number > new_card.number {
					r = mid
				} else {
					l = mid
				}
			}
		//两张牌的颜色不同
		} else {
			if user.cards[mid].color < new_card.color {
				l = mid
			} else {
				r = mid
			}
		}
	}
	return r
}

//添加新牌
func (user *UserCard) Insert_Card(newcards []Card) {
	for _,new_card := range newcards{
		r := user.BinaryInsert(new_card)
		new_cards := append(user.cards[:r-1],new_card)
		new_cards = append(user.cards[r:])
		user.cards = new_cards
		user.number += 1
	}
}

//移除牌
func (user *UserCard) Remove_Card(oldcards []Card){
	for _,old_card := range oldcards{
		r := user.BinaryInsert(old_card)
		new_cards := append(user.cards[:r-1],user.cards[r+1:]...)
		user.cards = new_cards
		user.number += 1
	}
}

