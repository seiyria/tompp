import { Component, OnInit } from '@angular/core';

import { sampleSize, shuffle } from 'lodash';
import * as YAML from 'js-yaml';
import { LocalStorage } from 'ngx-webstorage';

import { ElectronService } from '../core/services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  
  @LocalStorage()
  public config: any;

  constructor(public electronService: ElectronService) { }

  ngOnInit(): void {
  }

  loadFile($event): void {
    const file: File = $event.target.files[0];
    const reader: FileReader = new FileReader();
    reader.onloadend = (e) => {
      const config = YAML.safeLoad(reader.result);
      this.config = config;
    }

    reader.readAsText(file);
  }

  setRandomSeed(): void {
    this.config.seed = this.generateSeed();
  }

  generateSeed(): string {
    const possibleSeedValues = [
      'Duran', 'Angela', 'Charlotte', 'Riesz', 'Hawkeye', 'Kevin',
      'Luna', 'Salamando', 'Undine', 'Dryad', 'Sylphid', 'Gnome', 'Mana',
      'Valda', 'Crimson', 'MachineGolem', 'DarkshineKnight', 'DragonLord', 'DragonEmperor',
      'Gauser', 'Ludgar', 'Goremand', 'Heath', 'MaskedMage', 'DarkLich',
      'Flamekhan', 'Bill&Ben', 'Bill', 'Ben', 'Belladonna', 'Malocchio', 'DarkMajesty', 'ArchDemon',
      'Richard', 'Loki', 'Anise', 'Vuscav', 'Flammie',
      'Dangaard', 'LandUmber', 'Fiegmund', 'Mispolm', 'XanBie', 'Dolan', 'Lightgazer', 'ZableFahr',
      'FullmetalHugger', 'JewelEater', 'Zhenker', 'Genoa', 'Tzenker',
      'Jadd', 'Astoria', 'Wendel', 'Maia', 'Valsena', 'Beiser', 'Palo', 'Laurent', 
      'Beuca', 'Alrant', 'Sirhtan', 'Diin', 'Mintas', 'Dior', 'Oblivisle', 'Pedda',
      'Rabite', 'Goblin', 'Kerberos', 'Porobin', 'Zombie', 'Ghoul', 'Slime',
      'Magician', 'Cockatrice', 'Gremlin', 'Harpy', 'Ninja', 'Spectre', 'Sahagin', 
      'Basilisk', 'Werewolf', 'Dragon', 'Demon', 'Shapeshifter'
    ];

    return shuffle(sampleSize(possibleSeedValues, 5)).join('-');
  }

}
