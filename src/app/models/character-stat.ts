export class CharacterStat {
    id: string;
    name: string;
    value: number;
    maximum: number;
    type: string;

    constructor(statId: string, statName: string, statValue: number, statMax: number, statType: string) {
        this.id = statId;
        this.name = statName;
        this.value = statValue;
        this.maximum = statMax;
        this.type = statType;
    }
}
