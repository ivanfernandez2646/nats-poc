export default abstract class NumberValueObject {
  readonly value: number;

  constructor(value: number) {
    this.value = value;
  }

  equalsTo(other: NumberValueObject): boolean {
    return this.value === other.value;
  }
}
