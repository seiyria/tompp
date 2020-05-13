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
      name: 'SPP Stats',
      stats: [
        'dropSpp', 'knockoutDropSpp', 'lAttackDropSpp', 'chargeAttackDropSpp'
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
    drop1: 'Drop Rate (Item 1)',
    drop2: 'Drop Rate (Item 2)',
    drop3: 'Drop Rate (Item 3)'
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
