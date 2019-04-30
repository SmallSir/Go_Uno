package controllers

import (
	"math/rand"
	"strconv"
	"time"
)

type Cards struct {
	//未出的牌堆
	ready_card []Card
	//未出的牌的个数
	ready_number int
	//已出的牌堆
	out_card []Card
	//出牌的个数
	out_number int
	//牌的颜色
	card_colors []string
	//牌的不同颜色状态
	card_function []string
	//王牌
	wild []string
}

func (c *Cards) Start() {
	c.ready_number = 108
	c.out_number = 0
	c.card_colors = []string{"red", "green", "blue", "yellow"}
	c.card_function = []string{"skip", "reverse", "raw"}
	c.wild = []string{"wild", "wildraw"}
	c.ready_card = make([]Card, 0, 108)
	c.out_card = make([]Card, 0, 108)
	//生成常规牌
	for _, co := range c.card_colors {
		for j := 0; j < 10; j++ {
			card := Card{Color: co, State: "-1", Number: strconv.Itoa(j)}
			if j == 0 {
				c.ready_card = append(c.ready_card[:], card)
			} else {
				c.ready_card = append(c.ready_card[:], card)
				c.ready_card = append(c.ready_card[:], card)
			}
		}
		for _, f := range c.card_function {
			card := Card{Number: "-1", Color: co, State: f}
			c.ready_card = append(c.ready_card[:], card)
			c.ready_card = append(c.ready_card[:], card)
		}
	}
	for _, w := range c.wild {
		card := Card{Color: "z", State: w, Number: "-1"}
		for i := 0; i < 4; i++ {
			c.ready_card = append(c.ready_card[:], card)
		}
	}
	c.Shuffle()
}

//洗牌
func (c *Cards) Shuffle() {
	rand.Seed(time.Now().UnixNano())
	for i := c.ready_number - 1; i > 0; i-- {
		j := rand.Intn(i)
		tmp := c.ready_card[j]
		c.ready_card[j].Number = c.ready_card[i].Number
		c.ready_card[j].Color = c.ready_card[i].Color
		c.ready_card[j].State = c.ready_card[i].State
		c.ready_card[i].Number = tmp.Number
		c.ready_card[i].State = tmp.State
		c.ready_card[i].Color = tmp.Color
	}
}

//出牌回收
func (c *Cards) OutCards(outcard Card) {
	c.out_card = append(c.out_card[:], outcard)
	c.out_number++
}

//摸牌
func (c *Cards) AddCards(number int) []Card {
	returncard := make([]Card, 0, 108)
	if c.ready_number < number {
		returncard = append(c.ready_card[:])
		number -= c.ready_number
		c.ready_card = append(c.out_card)
		c.ready_number = c.out_number
		c.out_number = 0
		c.out_card = make([]Card, 0, 108)
		c.Shuffle()
	}
	returncard = append(returncard, c.ready_card[:number]...)
	c.ready_card = append(c.ready_card[number:])
	c.ready_number -= number
	return returncard
}
