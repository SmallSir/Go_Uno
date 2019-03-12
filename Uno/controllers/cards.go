package controllers

type Cards struct {
	//未出的牌堆
	ready_card []Card
	//已出的牌堆
	out_card []Card
	//牌的颜色
	card_colors []string
	//牌的不同颜色状态
	card_function []string
	//王牌
	wild []string
}

func (c *Cards) Start() {
	c.card_colors = []string{"red", "green", "blue", "yello"}
	c.card_function = []string{"skip", "reverse", "raw"}
	c.wild = []string{"wild", "wildraw"}
	c.ready_card = make([]Card, 108)
	c.out_card = make([]Card, 108)
	//生成常规牌
	for _, co := range c.card_colors {
		for j := 0; j < 10; j++ {
			card := Card{color: co, state: "-1", number: string(j)}
			if j == 0 {
				c.ready_card = append(c.ready_card[:], card)
			} else {
				c.ready_card = append(c.ready_card[:],card)
				c.ready_card = append(c.ready_card[:],card)
			}
		}
		for _,f := range(c.card_function){
			card := Card{number:"-1",color:co,state:f}
			c.ready_card = append(c.ready_card[:],card)
			c.ready_card = append(c.ready_card[:],card)
		}
	}
	for _,w := range c.wild{
		card := Card{color:"z",state:w,number:"-1"}
		for i := 0;i < 4;i++{
			c.ready_card = append(c.ready_card[:],card)
		}
	}	
}
