import './SelectStyle.css';
import cn from 'classnames';

export default function SelectStyle({ mode }) {
  return (
    <div className={cn(
        // class="box.panel.dark"
        'box',
        [
            'panel',
            {
                light: mode === 'ligth',
                dark: mode === 'dark'
            },
            'hoge',
            {
                light: mode === 'li',
                dark: mode === 'da'
            } 
        ]
    )}>
      こんにちは、世界！
    </div>
  );
}