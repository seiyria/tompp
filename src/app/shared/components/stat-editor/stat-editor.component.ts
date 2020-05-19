import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { get, set } from 'lodash';

@Component({
  selector: 'app-stat-editor',
  templateUrl: './stat-editor.component.html',
  styleUrls: ['./stat-editor.component.scss']
})
export class StatEditorComponent implements OnInit {

  @Input() public config: any;
  @Input() public subkey: string;

  @Output() public updateConfig = new EventEmitter();

  public get configEditSection(): any {
    return get(this.config, this.subkey);
  }

  public groups = [
    { name: 'Core Stats',
      stats: [
        'hp', 'mp', 'atk', 'def', 'agi', 'int', 'spr', 'luck', 'defMag', 'offMag'
      ] 
    },
    { name: 'Reward Stats', 
      stats: [
        'exp', 'lucre', 'drop1', 'drop2', 'drop3'
      ]
    },
    {
      name: 'Guard/SPP Stats',
      stats: [
        'guardDurable', 'downDurable', 'dropSpp', 'knockoutDropSpp', 'lAttackDropSpp', 'chargeAttackDropSpp'
      ]
    }
  ];

  public niceNames = {
    atk: 'Attack',
    def: 'Defense',
    agi: 'Agility',
    int: 'Intelligence',
    spr: 'Spirit',
    luck: 'Luck',
    exp: 'Experience On Kill',
    lucre: 'Lucre On Kill',
    defMag: 'Defensive Magic',
    offMag: 'Offensive Magic',
    guardDurable: 'Guard Durability',
    downDurable: 'Break Bar Durability',
    drop1: 'Drop Rate (Item 1)',
    drop2: 'Drop Rate (Item 2)',
    drop3: 'Drop Rate (Item 3)',
    dropSpp: 'Base SPP',
    knockoutDropSpp: 'Knockout SPP',
    lAttackDropSpp: 'LAttack SPP',
    chargeAttackDropSpp: 'Charge Attack SPP'
  };

  public descriptions = {
    hp: 'The amount of HP the enemy has.',
    mp: 'The amount of MP the enemy has.',
    atk: 'The enemy\'s base Attack.',
    def: 'The enemy\'s base Defense.',
    int: 'The enemy\'s base Intelligence.',
    spr: 'The enemy\'s base Spirit.',
    luck: 'The enemy\'s base Luck.',
    exp: 'The amount of experience earned when killing this enemy.',
    lucre: 'The amount of lucre earned when killing this enemy.',
    defMag: 'The potency of the enemy\'s defensive magic.',
    offMag: 'The potency of the enemy\'s offensive magic.',
    drop1: 'The drop chance for the item in slot 1 of the enemy\'s item drops.',
    drop2: 'The drop chance for the item in slot 2 of the enemy\'s item drops.',
    drop3: 'The drop chance for the item in slot 3 of the enemy\'s item drops.',
    dropSpp: 'Unsure. Related to the amount of charge earned for class skills.',
    guardDurable: 'Unsure. Probably the amount of damage needed to be done to break the enemy.',
    downDurable: 'Unsure. Probably the amount of damage needed to break the break bar of the enemy. Likely boss only.',
    knockoutDropSpp: 'Unsure. Related to the amount of charge earned for class skills.',
    lAttackDropSpp: 'Unsure. Related to the amount of charge earned for class skills.',
    chargeAttackDropSpp: 'Unsure. Related to the amount of charge earned for class skills.'
  }

  constructor() {}

  ngOnInit(): void {
    if(!this.configEditSection) {
      set(this.config, this.subkey, {});
    }
  }
}
