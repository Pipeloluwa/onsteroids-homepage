import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IconComponent } from '../../components/icon/icon';
import { DownloadService } from '../../services/download.service';

@Component({
  selector: 'app-docs',
  imports: [RouterLink, IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './docs.html'
})
export class DocsComponent {
  readonly downloadService = inject(DownloadService);
}
