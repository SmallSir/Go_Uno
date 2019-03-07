function Card(color,number,state,sprite,container){
    this.color = color;
    this.number = number;
    this.state = state;
    this.sprite = sprite
    this.sprite.interactive = true
    this.sprite.buttonMode = true
    this.sprite.on('mouseover', OverCard).on('mouseout', OutCard).on('click',ClickCard);
    function ClickCard()
    {
        this.destroy()
    }
    function OverCard()
    {
        this.y = this.y - 40;
    }
    function OutCard()
    {
        this.y = this.y + 40;
    }
}

