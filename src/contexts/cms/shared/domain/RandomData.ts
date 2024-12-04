import { randomUUID } from 'crypto';
import AggregateRoot from './AggregateRoot';

export class RandomData extends AggregateRoot {
  private readonly data: { id: string } & Record<string, unknown>;

  constructor() {
    super();

    this.data = {
      id: randomUUID(),
      index: 0,
      guid: 'c9c39099-34f7-4874-9b14-b7547a4c8f28',
      isActive: false,
      balance: '$2,286.20',
      picture: 'http://placehold.it/32x32',
      age: 26,
      eyeColor: 'blue',
      name: 'Cooley Campos',
      gender: 'male',
      company: 'POLARIUM',
      email: 'cooleycampos@polarium.com',
      phone: '+1 (950) 453-2823',
      address: '954 Chester Court, Faxon, Georgia, 2567',
      about:
        'Laborum qui sunt reprehenderit ut id nostrud laborum ad adipisicing ea sunt nostrud esse eiusmod. Sunt deserunt dolor anim ut dolore. In non minim laboris aute commodo proident eiusmod esse nulla veniam. Tempor Lorem reprehenderit velit ullamco mollit laboris adipisicing tempor adipisicing minim cillum voluptate eu.\r\n',
      registered: '2019-08-15T12:06:34 -02:00',
      latitude: 21.967538,
      longitude: -64.850995,
      tags: ['incididunt', 'quis', 'voluptate', 'ullamco', 'sit', 'commodo', 'velit'],
      friends: [
        {
          id: 0,
          name: 'Deleon Cox'
        },
        {
          id: 1,
          name: 'Fran Castro'
        },
        {
          id: 2,
          name: 'Walsh Murphy'
        }
      ],
      greeting: 'Hello, Cooley Campos! You have 1 unread messages.',
      favoriteFruit: 'strawberry'
    };
  }

  get id(): string {
    return this.data.id;
  }

  toPrimitives(): unknown {
    return this.data;
  }
}
