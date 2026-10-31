import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IconComponent } from '../../components/icon/icon';
import { DownloadService } from '../../services/download.service';

@Component({
  selector: 'app-features',
  imports: [RouterLink, IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './features.html'
})
export class FeaturesComponent {
  readonly downloadService = inject(DownloadService);
}
