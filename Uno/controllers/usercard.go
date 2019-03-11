package controllers


type UserCard struct {
	cards  []Card
	number int
}

//手牌排序
func (user *UserCard) Sort() {
	user.QuickSort(0,user.number - 1)
}

//快排
func (user *UserCard) QuickSort(l,r int){
	if l >= r{
		return 
	}
	i,j,key := l,r,user.cards[l]
	for i<j{
		for i < j && user.Compare(user.cards[j],key) {
			j--;
		}
		if i < j{
			user.cards[i] = user.cards[j]
			i++
		}
		
	}
}

//两张牌比大小
func (user *UserCard) Compare(x Card,y Card) bool{
	if(x.color == y.color){
		if x.number == "-1"{
			if y.number == "-1"{
				return x.state < y.state
			}else{
				return false
			}
		}else{
			if y.number == "-1"{
				return true
			} else{
				return x.number < y.number
			}
		}
	} else {
		return x.color < y.color
	}
}

//二分查找
func (user *UserCard) BinaryInsert(new_card Card) int{
	l := 0
	r := user.number - 1
	for l < r-1 {
		mid := (l + r) / 2
		check := user.Compare(user.cards[mid],new_card)
		if check {
			l = mid
		} else{
			r = mid
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

