import { Component, OnInit, NgZone } from '@angular/core';

import { LocalStorage } from 'ngx-webstorage';

import { sampleSize, shuffle } from 'lodash';
import * as YAML from 'js-yaml';
import { saveAs } from 'file-saver';

import { ElectronService } from '../core/services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  
  @LocalStorage()
  public config: any;

  @LocalStorage()
  public unrealPak: string;

  @LocalStorage()
  public dumpStats: boolean;

  public removeButtonVisibility = {};
  public currentEditNames = {};
  public version: string;

  constructor(
    private ngZone: NgZone,
    public electronService: ElectronService
  ) { }

  ngOnInit(): void {
    if(this.electronService.isElectron) {
      this.electronService.ipcRenderer.on('display-error', (event, error) => {
        alert(error);
      });

      this.electronService.ipcRenderer.on('display-message', (event, message) => {
        alert(message);
      });

      this.electronService.ipcRenderer.on('set-version', (event, version) => {
        this.ngZone.run(() => {
          this.version = version;
        });
      });

      this.electronService.ipcRenderer.send('get-version');
    }

    if(!this.unrealPak) this.unrealPak = 'UnrealPak.exe';

    if(this.config?.specific) {
      Object.keys(this.config.specific || {}).forEach(spec => {
        this.currentEditNames[spec] = spec;
      });
    }
  }

  loadFile($event): void {
    const file: File = $event.target.files[0];
    const reader: FileReader = new FileReader();
    reader.onloadend = () => {
      const config = YAML.safeLoad(reader.result as string);
      this.config = config;
      $event.target.value = null;
    }

    reader.readAsText(file);
  }

  saveFile(): void {
    const config = YAML.safeDump(this.config);
    const blob = new Blob([config], { type: 'text/yml' });
    saveAs(blob, 'config.yml');
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

  updateConfig(): void {
    this.config = this.config;
  }

  addNewConfigSpecificEntry(): void {
    this.config.specific = this.config.specific || {};
    this.config.specific['#New_Creature_Edit_Me'] = {};
    this.config = this.config;
  }

  updateSpecificKey(oldName: string): void {
    const newName = this.currentEditNames[oldName];
    
    this.currentEditNames[newName] = newName;
    delete this.currentEditNames[oldName];

    this.config.specific[newName] = Object.assign({}, this.config.specific[oldName]);
    delete this.config.specific[oldName];
  }

  removeSpecificKey(key: string): void {
    delete this.currentEditNames[key];
    delete this.config.specific[key];
  }

  generatePak(): void {
    this.electronService.ipcRenderer.send('run-app', { config: this.config, dumpStats: this.dumpStats, unrealPak: this.unrealPak });
  }

}
