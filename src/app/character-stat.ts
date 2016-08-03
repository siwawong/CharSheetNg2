export class CharacterStat {
    private id: string;
    private name: string;
    private value: number;
    private maximum: number;
    private type: string;

    constructor(statId: string, statName: string, statValue: number, statMax: number, statType: string) {
        this.id = statId;
        this.name = statName;
        this.value = statValue;
        this.maximum = statMax;
        this.type = statType;
    }

    increment(): void {
        this.value++;
        if (this.maximum > 0 && this.value > this.maximum)
            this.value = this.maximum;
    }

    decrement(): void {
        if (this.value-- > -1)
            this.value--;
    }

    increase(increaseAmount: number): void {
        this.value+= increaseAmount;
        if (this.maximum > 0 && this.value > this.maximum)
            this.value = this.maximum;
    }

    decrease(decreaseAmount: number): void {
        this.value -= decreaseAmount;
        if (this.value < 0)
            this.value = 0;
    }

    reset(): void {
        if (this.maximum > 0)
            this.value = this.maximum;
    }

    getValues(): any {
        var returnValues;
        let {id, name, value, maximum, type} = returnValues;
        return returnValues;
    }
}
