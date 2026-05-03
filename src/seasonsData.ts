import { Track } from './types';

export type SeasonId = 'spring' | 'summer' | 'autumn' | 'winter';

export interface EQTestConfig {
  id: string;
  title: string;
  description: string;
  stats: {
    questions: number;
    time: string;
    scale: { value: number; label: string; emoji: string }[];
  };
  instructions: string[];
  questions: { 
    id: string; 
    text: string; 
    category?: string; 
    reversed?: boolean;
    options?: { value: number; label: string; taste?: string }[];
  }[];
  options: { value: number; label: string; taste?: string }[];
  results: {
    type: 'pillars' | 'score' | 'count';
    categories?: Record<string, string>;
    ranges?: { min: number; max: number; title: string; insight: string; suggestion: string }[];
    countMeanings?: Record<string, { title: string; description: string; challenge: string }>;
  };
}

export interface SeasonInfo {
  id: SeasonId;
  name: string;
  theme: string;
  heroTitle: string;
  heroSubtitle: string;
  heroImage: string;
  color: string;
  accentColor: string;
  quote: string;
  actions: { icon: string; text: string }[];
  tracks: Track[];
  storyTitle: string;
  storyContent: string;
  storyInspiration?: string;
  eqTests: EQTestConfig[];
  conclusion: string;
  reflection?: {
    title: string;
    subtitle: string;
    questions: string[];
    footer: string;
  };
  sevenDayChallenge?: {
    title: string;
    description: string;
    days: { day: number; content: string }[];
  };
  writingPrompts?: string[];
  carryingItems?: {
    title: string;
    items: string[];
    columns: string[];
    immediateActionPrompt: string;
    immediateActions: {
      id: string;
      label: string;
      icon: string;
      description: string;
      type: 'note' | 'timer' | 'contact';
      details: string;
    }[];
  };
}

export const SEASONS_DATA: Record<SeasonId, SeasonInfo> = {
  spring: {
    id: 'spring',
    name: 'Xuân',
    theme: 'Gieo mầm (Tự nhận thức)',
    heroTitle: 'Mầm Quýt Trong Sân Nhà',
    heroSubtitle: 'Hành trình nhận diện bản thân và những giá trị sống cốt lõi.',
    heroImage: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&q=80&w=2070',
    color: '#10b981',
    accentColor: 'bg-emerald-500',
    quote: 'Sự tự nhận thức không bắt đầu bằng câu trả lời, mà bằng một câu hỏi đủ lớn để em dám đối diện với chính mình.',
    actions: [
      { icon: '🌱', text: 'Nhận diện bản thân' },
      { icon: '📖', text: 'Viết nhật ký' },
      { icon: '🍊', text: 'Gieo mầm EQ' }
    ],
    tracks: [
      {
        id: 'sp1',
        title: 'Lời chào từ mầm xanh',
        subtitle: 'Chương Xuân — Khởi đầu mới',
        duration: '06:30',
        audioUrl: '/xuan.mp3',
        coverUrl: 'https://images.unsplash.com/photo-1522748906645-95d8adfd52c7?auto=format&fit=crop&q=80&w=2070',
      }
    ],
    storyTitle: 'Mầm quýt trong sân nhà',
    storyInspiration: 'Khi cuộc đời cho bạn quả quýt',
    storyContent: 'Mùa xuân năm ấy, Ae-sun mười tuổi. Mẹ vừa mất – một haenyeo lặn xuống biển và không trở lên. Tang lễ xong, bà nội gọi cô vào: "Từ nay con là chị cả, lo cho hai em." Ae-sun chỉ biết gật đầu. Cô không khóc nổi. Không phải vì mạnh mẽ, mà vì cô chưa học được cách để mất đi người mình yêu thương nhất.\n\nĐêm đó, cô bé nằm trong căn phòng tối, nghe tiếng gió từ biển thổi vào. Cô tự hỏi: "Mình là ai khi không còn là con gái của mẹ?" Câu hỏi ấy ám ảnh cô suốt nhiều năm sau, khi cô lén viết thơ, khi cô trèo lên chuyến tàu rời Jeju, khi cô đứng giữa Seoul xa lạ mà lòng trống hoác.\n\nMãi sau này, khi đã đi qua bao mùa xuân, Ae-sun mới hiểu: Sự tự nhận thức không bắt đầu bằng câu trả lời, mà bằng một câu hỏi đủ lớn để em dám đối diện với chính mình. Câu hỏi ấy – như một hạt mầm quýt chua lẻ loi – nếu được đặt đúng nơi, sẽ nảy rễ và cho em bản đồ đầu tiên của tâm hồn.',
    eqTests: [
      {
        id: 'sp-map',
        title: 'Bản đồ cảm xúc - Hành trình nhận diện',
        description: 'Chào em, em có bao giờ tự hỏi: "Tại sao có những hôm mình bùng nổ chỉ vì một câu nói vô tình?" hay "Sao mình khó mở lòng với người khác đến thế, dù bên trong rất muốn được thấu hiểu?". Chúng ta lớn lên được dạy cách tính toán, cách đạt điểm cao, nhưng hiếm ai dạy ta cách đọc vị chính cảm xúc của mình. Bài test này không phải một kỳ thi, nó chỉ là một tấm bản đồ thô để em thấy mình đang mạnh ở đâu, yếu ở chỗ nào.',
        stats: {
          questions: 20,
          time: '8–10 phút',
          scale: [
            { value: 1, label: 'Rất không đúng', emoji: '🟤' },
            { value: 2, label: 'Không đúng', emoji: '🟠' },
            { value: 3, label: 'Bình thường', emoji: '🟡' },
            { value: 4, label: 'Đúng', emoji: '🟢' },
            { value: 5, label: 'Rất đúng', emoji: '🔵' }
          ]
        },
        instructions: [
          'Số câu hỏi: 20',
          'Thời gian dự kiến: 8–10 phút',
          'Cách trả lời: Chọn mức độ từ 1 đến 5 cho mỗi câu hỏi.',
          'Trả lời theo những gì em thực sự làm và cảm nhận, không theo những gì em nghĩ mình nên làm.'
        ],
        questions: [
          { id: '1', text: 'Khi một cảm xúc khó chịu xuất hiện (buồn, tức, sợ), tôi thường nhận ra ngay đó là cảm xúc gì.', category: 'self-awareness' },
          { id: '2', text: 'Tôi dễ dàng nói với người khác về cảm xúc thật của mình.', category: 'expression' },
          { id: '3', text: 'Khi bạn bè gặp chuyện buồn, tôi thực sự cảm thấy như mình cũng đang trải qua điều đó.', category: 'empathy' },
          { id: '4', text: 'Dưới áp lực học tập hoặc công việc, tôi vẫn giữ được bình tĩnh và suy nghĩ rõ ràng.', category: 'stress' },
          { id: '5', text: 'Ngay cả khi mọi thứ tồi tệ, tôi vẫn tin rằng rồi sẽ có điều tốt đẹp xảy ra.', category: 'optimism' },
          { id: '6', text: 'Đôi khi tôi bùng nổ mà không hiểu tại sao mình lại như vậy.', category: 'self-awareness', reversed: true },
          { id: '7', text: 'Tôi thường che giấu cảm xúc thật, kể cả với người thân.', category: 'expression', reversed: true },
          { id: '8', text: 'Tôi gặp khó khăn khi phải đặt mình vào vị trí của người khác.', category: 'empathy', reversed: true },
          { id: '9', text: 'Khi gặp thất bại, tôi thường bị cuốn vào lo lắng và mất ngủ.', category: 'stress', reversed: true },
          { id: '10', text: 'Tôi dễ nản lòng khi mọi việc không diễn ra như ý.', category: 'optimism', reversed: true },
          { id: '11', text: 'Tôi biết chính xác điều gì khiến mình vui, điều gì khiến mình buồn.', category: 'self-awareness' },
          { id: '12', text: 'Tôi không ngại bộc lộ sự yếu đuối nếu đó là sự thật.', category: 'expression' },
          { id: '13', text: 'Tôi có thể đoán được cảm xúc của người đối diện chỉ qua ánh mắt và giọng nói.', category: 'empathy' },
          { id: '14', text: 'Tôi có những cách lành mạnh để xả stress (nghe nhạc, viết, đi bộ, nói chuyện...).', category: 'stress' },
          { id: '15', text: 'Tôi tin rằng dù hiện tại khó khăn, tương lai vẫn có thể tốt đẹp hơn.', category: 'optimism' },
          { id: '16', text: 'Có những lúc tôi cảm thấy "lạc lối" không biết mình là ai.', category: 'self-awareness', reversed: true },
          { id: '17', text: 'Tôi thường im lặng dù trong lòng đang rất muốn nói.', category: 'expression', reversed: true },
          { id: '18', text: 'Tôi thấy khó thực sự vui mừng cho thành công của người khác.', category: 'empathy', reversed: true },
          { id: '19', text: 'Tôi dễ bị kích động hoặc cáu gắt khi bị chỉ trích.', category: 'stress', reversed: true },
          { id: '20', text: 'Nhìn chung, tôi nghĩ mình là người lạc quan hơn bi quan.', category: 'optimism' }
        ],
        options: [
          { value: 1, label: 'Rất không đúng' },
          { value: 2, label: 'Không đúng' },
          { value: 3, label: 'Bình thường' },
          { value: 4, label: 'Đúng' },
          { value: 5, label: 'Rất đúng' }
        ],
        results: {
          type: 'pillars',
          categories: {
            'self-awareness': 'Tự nhận thức cảm xúc',
            'expression': 'Thể hiện cảm xúc',
            'empathy': 'Đồng cảm',
            'stress': 'Quản trị căng thẳng',
            'optimism': 'Lạc quan'
          }
        }
      },
      {
        id: 'sp-taste',
        title: 'BÀI TEST THỨ 2 – VỊ QUÝT CỦA TÔI',
        description: 'Giá trị sống & Tự chấp nhận. Bài test này giống như một buổi chiều em ngồi bóc một quả quýt do chính tay mình trồng. Mỗi múi – chua, chát, ngọt – đều kể cho em nghe một điều về con người thật của em.',
        stats: {
          questions: 10,
          time: '5 phút',
          scale: [
            { value: 1, label: 'Chua (⭐)', emoji: '🍋' },
            { value: 2, label: 'Chát (🌶️)', emoji: '🍃' },
            { value: 3, label: 'Ngọt (🍯)', emoji: '🍯' }
          ]
        },
        instructions: [
          'Số câu hỏi: 10',
          'Chọn đáp án đầu tiên bật lên trong đầu. Đừng nghĩ quá nhiều. Càng thật, em càng thấy rõ "vị" của đời mình.'
        ],
        questions: [
          { 
            id: 't1', 
            text: 'Khi em mắc một lỗi lớn (ví dụ: làm hỏng việc nhóm, nói lời làm tổn thương người thân), điều em thường làm nhất sau đó là…',
            options: [
              { value: 1, label: 'Tự trách mình rất lâu, có khi hàng tuần, cảm thấy mình vô dụng.', taste: 'chua' },
              { value: 2, label: 'Cố gắng sửa lỗi nhưng vẫn day dứt, khó ngủ, hay nghĩ lại.', taste: 'chat' },
              { value: 3, label: 'Chấp nhận mình đã sai, xin lỗi nếu cần, rồi nghĩ cách khắc phục và học từ nó.', taste: 'ngot' }
            ]
          },
          { 
            id: 't2', 
            text: 'Em nghĩ thế nào về những ước mơ hồi nhỏ (làm phi công, ca sĩ, viết truyện…)?',
            options: [
              { value: 1, label: 'Thấy chúng thật ngây ngô, hơi xấu hổ, không muốn ai nhắc.', taste: 'chua' },
              { value: 2, label: 'Em vẫn nhớ và nuối tiếc, nhưng nghĩ giờ quá muộn để theo đuổi.', taste: 'chat' },
              { value: 3, label: 'Em trân trọng chúng, đôi khi vẫn làm những việc nhỏ để giữ lửa.', taste: 'ngot' }
            ]
          },
          { 
            id: 't3', 
            text: 'Khi bạn thân của em đạt được thành công lớn trong khi em vẫn đang loay hoay, em thấy…',
            options: [
              { value: 1, label: 'Ghen tị, hơi tủi thân, thậm chí tránh gặp bạn một thời gian.', taste: 'chua' },
              { value: 2, label: 'Vui cho bạn nhưng tự dưng thấy áp lực, so sánh mình với bạn.', taste: 'chat' },
              { value: 3, label: 'Thực sự vui mừng, chúc bạn và xem đó là động lực.', taste: 'ngot' }
            ]
          },
          { 
            id: 't4', 
            text: 'Bố mẹ hay người thân có kỳ vọng vào em (ví dụ: học ngành A, làm việc B, lấy vợ/chồng ở tuổi C). Em thường…',
            options: [
              { value: 1, label: 'Làm theo để khỏi phật ý, dù trong lòng không thoải mái.', taste: 'chua' },
              { value: 2, label: 'Vừa muốn làm theo vừa muốn phản kháng, hay căng thẳng khi về nhà.', taste: 'chat' },
              { value: 3, label: 'Lắng nghe, nhưng quyết định dựa trên điều mình thực sự muốn.', taste: 'ngot' }
            ]
          },
          { 
            id: 't5', 
            text: 'Khi nhìn lại 5 năm qua, em cảm thấy thế nào về những thất bại của mình?',
            options: [
              { value: 1, label: 'Em hầu như chỉ nhớ thất bại, chúng ám ảnh và khiến em tự ti.', taste: 'chua' },
              { value: 2, label: 'Em nhớ nhưng cố gắng chôn vùi, không thích nhắc tới.', taste: 'chat' },
              { value: 3, label: 'Em coi chúng là bài học cần thiết, giúp em trưởng thành.', taste: 'ngot' }
            ]
          },
          { 
            id: 't6', 
            text: 'Em có dễ dàng tha thứ cho chính mình khi đã làm điều gì đó trái với giá trị của mình không?',
            options: [
              { value: 1, label: 'Rất khó, em có thể dằn vặt hàng tháng, thậm chí hàng năm.', taste: 'chua' },
              { value: 2, label: 'Cần rất lâu và phải có ai đó an ủi, khuyên bảo thì em mới nguôi ngoai.', taste: 'chat' },
              { value: 3, label: 'Em biết cách tự tha thứ sau một thời gian hợp lý, và tự nhắc mình "ai cũng có thể sai".', taste: 'ngot' }
            ]
          },
          { 
            id: 't7', 
            text: 'Buổi tối, khi nằm một mình, suy nghĩ thường trực của em là…',
            options: [
              { value: 1, label: '“Mình không đủ giỏi, không đủ xinh, không đủ may mắn…”', taste: 'chua' },
              { value: 2, label: '“Mình nên làm gì tiếp theo để không thua bạn bè?”', taste: 'chat' },
              { value: 3, label: '“Hôm nay có điều gì mình biết ơn? Mình muốn ngày mai thế nào?”', taste: 'ngot' }
            ]
          },
          { 
            id: 't8', 
            text: 'Có ai đó nói rằng em "quá nhạy cảm" hoặc "nghĩ nhiều". Em phản ứng ra sao?',
            options: [
              { value: 1, label: 'Em tin họ và tự thấy mình yếu đuối, có lỗi.', taste: 'chua' },
              { value: 2, label: 'Em cố tỏ ra mạnh mẽ hơn, nhưng bên trong vẫn buồn.', taste: 'chat' },
              { value: 3, label: 'Em nghĩ “sự nhạy cảm là một điểm mạnh” và không cố thay đổi để làm vừa lòng tất cả.', taste: 'ngot' }
            ]
          },
          { 
            id: 't9', 
            text: 'Khi em gặp một người lạ hoặc ở môi trường mới, em thường…',
            options: [
              { value: 1, label: 'Rất rụt rè, sợ bị đánh giá, hầu như không dám mở lời.', taste: 'chua' },
              { value: 2, label: 'Muốn kết bạn nhưng hay nghĩ “người ta không thích mình đâu”.', taste: 'chat' },
              { value: 3, label: 'Mở lời một cách tự nhiên, chấp nhận rằng có thể không hợp ngay.', taste: 'ngot' }
            ]
          },
          { 
            id: 't10', 
            text: 'Định nghĩa của em về "thành công" trong 5 năm tới là gì?',
            options: [
              { value: 1, label: 'Có địa vị, thu nhập cao, được nhiều người ngưỡng mộ.', taste: 'chua' },
              { value: 2, label: 'Ổn định công việc, có nhà có xe, bằng bạn bằng bè.', taste: 'chat' },
              { value: 3, label: 'Làm công việc mình yêu thích, có các mối quan hệ lành mạnh.', taste: 'ngot' }
            ]
          }
        ],
        options: [], // Not used when questions have specific options
        results: {
          type: 'count',
          countMeanings: {
            'chua': {
              title: 'Vị Chua Chiếm Ưu Thế (≥5)',
              description: 'Em đang sống với nhiều phán xét khắc nghiệt lên chính mình. Em thường tự trách, so sánh và khó tha thứ. Điều này không phải vì em yếu, mà vì em đã học được thói quen ấy từ rất sớm.',
              challenge: 'Thử thách dành cho em: Viết vào Nhật ký Quả Quýt 3 điều em tha thứ cho bản thân hôm nay. Làm ngay trước khi ngủ.'
            },
            'chat': {
              title: 'Vị Chát Chiếm Ưu Thế (≥5)',
              description: 'Em ở giữa ranh giới của tự ti và chấp nhận. Em có giá trị rất rõ nhưng vẫn còn sợ thể hiện, sợ bị đánh giá, hay giằng co giữa ‘muốn làm mình’ và ‘sợ khác người’.',
              challenge: 'Thử thách dành cho em: Gửi một tin nhắn thật lòng (chia sẻ khó khăn hoặc lời cảm ơn) cho một người em tin tưởng – không cần hồi đáp, chỉ cần em dám gửi.'
            },
            'ngot': {
              title: 'Vị Ngọt Chiếm Ưu Thế (≥5)',
              description: 'Em đã có nền tảng tự yêu thương vững vàng. Em biết chấp nhận cả chua lẫn chát, và đang sống đúng với giá trị của mình.',
              challenge: 'Thử thách dành cho em: Hãy vào mục ‘Trái tim đồng điệu’ và chia sẻ một điều nhỏ đã giúp em trở nên như hôm nay – để tiếp thêm niềm tin cho người khác.'
            }
          }
        }
      }
    ],
    conclusion: 'Chào em, hãy nhớ hít một hơi thật sâu và tự nhủ: "Mình đang ở đây. Mình sẵn sàng lắng nghe chính mình." Chúc em một mùa Xuân gieo mầm nhẹ nhàng.'
  },
  summer: {
    id: 'summer',
    name: 'Hạ',
    theme: 'Quản trị biến cố',
    heroTitle: 'Mùa Hạ: Đối Diện Vết Sẹo',
    heroSubtitle: 'Trở về với chính mình giữa những biến động gay gắt của cuộc đời.',
    heroImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=2073',
    color: '#f26622',
    accentColor: 'bg-brand-orange',
    quote: 'Có những mùa hạ không đi qua bằng tiếng cười, mà đi qua bằng những lần ta đủ can đảm để ngồi yên cùng chính mình.',
    actions: [
      { icon: '☀️', text: 'Nhận diện biến cố' },
      { icon: '🧡', text: 'Chữa lành nội tại' },
      { icon: '💨', text: 'Thanh lọc cảm xúc' }
    ],
    tracks: [
      {
        id: 'su1',
        title: 'Khi đời làm mình nóng rát',
        subtitle: 'Chương Hạ — Quản trị biến cố',
        duration: '07:12',
        audioUrl: '/ha.mp3',
        coverUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=2073',
      }
    ],
    storyTitle: 'Mùa hạ và những vỏ quýt nứt',
    storyContent: 'Mùa hạ ở Jeju không dịu dàng như người ta vẫn nghĩ. Nắng đổ xuống mái nhà, biển thì sáng lóa, còn lòng người đôi khi lại nóng rát vì những điều không thể giữ nổi. Ae-sun bước vào mùa hạ của đời mình bằng những vết xước đầu tiên: một lần thất bại, một lần bị hiểu lầm, một lần nhận ra rằng có những điều dù cố đến mấy cũng không cứu được.\n\nCô đã từng nghĩ, chỉ cần mạnh mẽ hơn là đủ. Nhưng mùa hạ dạy cô một điều khác: không phải mọi cơn đau đều cần được chống đỡ ngay lập tức. Có những nỗi buồn phải được ngồi xuống cạnh nó, thở cùng nó, và gọi đúng tên nó. Như một quả quýt chín quá dưới nắng, lớp vỏ có thể nứt, nhưng bên trong vẫn còn nước, còn vị, còn một thứ ngọt ngào rất chậm để người ta học cách nếm lại chính mình.\n\nVới sinh viên, mùa hạ là lúc áp lực học tập, áp lực tương lai, thất bại, xung đột và cô đơn cùng lúc ập đến. Chương Hạ được tạo ra để nói với người trẻ rằng: không sao cả nếu em đang mệt, đang chới với, đang thấy mình không còn đủ sức. Điều quan trọng không phải là em không gục ngã, mà là em biết cách đứng dậy sau khi đã thật sự chạm đáy cảm xúc.',
    reflection: {
      title: 'Bản đồ cơn bão',
      subtitle: 'BÀI VIẾT PHẢN CHIẾU: "CƠN BÃO GẦN NHẤT CỦA TÔI"',
      questions: [
        'Gần đây mình đã gặp biến cố gì?',
        'Khi ấy mình đã cảm thấy gì?',
        'Mình đã phản ứng ra sao?',
        'Điều mình thật sự cần lúc đó là gì?'
      ],
      footer: 'Đây chính là bước đầu của trí tuệ cảm xúc: nhận diện – hiểu – và điều chỉnh phản ứng của bản thân trước một tình huống.'
    },
    sevenDayChallenge: {
      title: 'Thử thách 7 ngày: "Ôm lấy mùa hạ"',
      description: 'Hành trình 7 ngày để em học cách đối diện và ôm ấp những tổn thương.',
      days: [
        { day: 1, content: 'Viết ra một điều đang làm mình đau nhất.' },
        { day: 2, content: 'Đặt tên cho cảm xúc đó bằng 1 từ.' },
        { day: 3, content: 'Viết 3 điều mình vẫn làm được dù đang mệt.' },
        { day: 4, content: 'Nhắn cho một người tin cậy một câu thật lòng.' },
        { day: 5, content: 'Đi bộ 10 phút không nghe nhạc, chỉ quan sát hơi thở.' },
        { day: 6, content: 'Viết về một thất bại đã dạy mình điều gì.' },
        { day: 7, content: 'Chọn một lời dịu dàng để nói với chính mình.' }
      ]
    },
    writingPrompts: [
      'Hôm nay điều gì làm mình thấy nặng lòng nhất?',
      'Có khoảnh khắc nào mình đã tự cứu mình một chút không?',
      'Nếu nỗi buồn này có màu, nó sẽ là màu gì?',
      'Mình muốn nói gì với bản thân của 1 tháng trước?'
    ],
    carryingItems: {
      title: 'ĐIỀU BẠN ĐANG MANG THEO',
      items: [
        'tự nghi ngờ bản thân',
        'giữ cảm xúc buồn/lo bên trong',
        'chưa thực sự tin mình xứng đáng'
      ],
      columns: ['Đúng với mình', 'Chưa đúng lắm'],
      immediateActionPrompt: 'Ngay lúc này, bạn muốn làm gì cho bản thân?',
      immediateActions: [
        {
          id: 'write',
          label: 'Viết ra',
          icon: '✍️',
          description: 'Mở mini note để trải lòng',
          type: 'note',
          details: 'Điều mình đang sợ nhất là...'
        },
        {
          id: 'breath',
          label: 'Nghỉ 2 phút',
          icon: '🧘',
          description: 'Animation thở & Timer',
          type: 'timer',
          details: '2'
        },
        {
          id: 'connect',
          label: 'Kết nối',
          icon: '🤝',
          description: 'Gợi ý chia sẻ',
          type: 'contact',
          details: 'Nhắn cho 1 người bạn tin tưởng'
        }
      ]
    },
    eqTests: [
      {
        id: 'su-stress',
        title: 'Bạn đang kẹt trong mùa hạ nào?',
        description: 'Nhận diện mức độ căng thẳng của bạn trong 2 tuần gần đây.',
        stats: {
          questions: 10,
          time: '5 phút',
          scale: [
            { value: 1, label: 'Không đúng', emoji: '🟤' },
            { value: 2, label: 'Hơi đúng', emoji: '🟠' },
            { value: 3, label: 'Khá đúng', emoji: '🟡' },
            { value: 4, label: 'Rất đúng', emoji: '🟢' }
          ]
        },
        instructions: [
          'Số câu hỏi: 10',
          'Chọn mức độ đúng nhất với bạn.',
          '1 = Không đúng, 2 = Hơi đúng, 3 = Khá đúng, 4 = Rất đúng'
        ],
        questions: [
          { id: 'c1', text: 'Khi buồn hoặc stress, mình thường cố gắng không nghĩ đến nó.' },
          { id: 'c2', text: 'Mình hay dùng điện thoại/ăn uống/giải trí để quên cảm xúc.' },
          { id: 'c3', text: 'Mình ít khi ngồi lại để hiểu mình đang cảm thấy gì.' },
          { id: 'c4', text: 'Mình thường nghĩ "chắc là do mình chưa đủ tốt".' },
          { id: 'c5', text: 'Khi có chuyện không ổn, mình có xu hướng đổ lỗi cho bản thân.' },
          { id: 'c6', text: 'Mình thấy mình không xứng đáng với những điều tốt.' },
          { id: 'c7', text: 'Gần đây mình thường xuyên cảm thấy mệt mỏi, quá tải.' },
          { id: 'c8', text: 'Mình khó thư giãn ngay cả khi không có việc gì cụ thể.' },
          { id: 'c9', text: 'Mình cảm thấy không có ai thực sự hiểu mình.' },
          { id: 'c10', text: 'Khi gặp chuyện, mình thường giữ trong lòng thay vì chia sẻ.' }
        ],
        options: [
          { value: 1, label: 'Không đúng' },
          { value: 2, label: 'Hơi đúng' },
          { value: 3, label: 'Khá đúng' },
          { value: 4, label: 'Rất đúng' }
        ],
        results: {
          type: 'score',
          ranges: [
            { min: 10, max: 20, title: 'NẮNG GẮT NHẸ', insight: 'Bạn có những cảm xúc tiêu cực nhất định, nhưng vẫn có khả năng tự điều chỉnh.', suggestion: 'Hãy bắt đầu bằng việc viết ra cảm xúc mỗi ngày.' },
            { min: 21, max: 30, title: 'NẮNG GẮT VỪA', insight: 'Bạn đang mệt và có dấu hiệu bị cảm xúc ảnh hưởng rõ rệt.', suggestion: 'Bạn cần nghỉ ngơi có ý thức, không chỉ "trốn tránh". Hãy chọn một người an toàn để chia sẻ.' },
            { min: 31, max: 40, title: 'NẮNG GẮT MẠNH', insight: 'Bạn đang bị quá tải cảm xúc và có thể đang chống chịu một mình.', suggestion: 'Bạn không cần phải tự chịu đựng một mình. Hãy viết ra và tìm một người đồng hành.' }
          ]
        }
      }
    ],
    conclusion: 'Có những mùa hạ không đi qua bằng tiếng cười, mà đi qua bằng những lần ta đủ can đảm để ngồi yên cùng chính mình. Và sau cùng, ta nhận ra: trái tim mình không hỏng, nó chỉ đang học cách lành lại.'
  },
  autumn: {
    id: 'autumn',
    name: 'Thu',
    theme: 'Thấu cảm & Kết nối',
    heroTitle: 'Thu Đi – Thấu Cảm & Kết Nối',
    heroSubtitle: 'Học cách lắng nghe bằng trái tim, không phán xét. Hàn gắn những mối quan hệ đã rạn nứt.',
    heroImage: 'https://images.unsplash.com/photo-1507783548227-544c3b8fc065?auto=format&fit=crop&q=80&w=2070',
    color: '#d97706',
    accentColor: 'bg-amber-600',
    quote: 'Mưa có thể rơi như thể nó sẽ cuốn trôi mọi thứ. Nhưng khi mặt trời lên, cuộc sống lại tiếp tục, bất kể điều gì xảy ra.',
    actions: [
      { icon: '🍂', text: 'Lắng nghe lặng lẽ' },
      { icon: '✉️', text: 'Viết thư tay' },
      { icon: '📞', text: 'Gọi cho người xa cách' }
    ],
    tracks: [
      {
        id: 'au1',
        title: 'Tiếng thở của mùa thu',
        subtitle: 'Chương Thu — Thấu cảm',
        duration: '05:50',
        audioUrl: '/thu.mp3',
        coverUrl: 'https://images.unsplash.com/photo-1507783548227-544c3b8fc065?auto=format&fit=crop&q=80&w=2070',
      }
    ],
    storyTitle: 'Thu Đi – Thấu Cảm & Kết Nối',
    storyContent: 'Em có nhớ Ae Sun trong "Khi cuộc đời cho bạn quả quýt" không?\n\nCuộc đời đã trao cho cô ấy không ít quả quýt chua – mất mẹ từ nhỏ, nghèo khó, bị người đời khinh rẻ, rồi những tổn thất chẳng thể kể hết. Thế nhưng, điều làm em rung động nhất chính là cách cô ấy vẫn chọn thấu cảm. Cô ấy khóc, cô ấy đau, nhưng cô ấy vẫn biết lắng nghe người khác, vẫn dang tay hàn gắn những rạn nứt, và trên hết – cô ấy cảm nhận được sự gắn bó kỳ diệu giữa con người với con người.\n\n“Mưa có thể rơi như thể nó sẽ cuốn trôi mọi thứ. Nhưng khi mặt trời lên, cuộc sống lại tiếp tục, bất kể điều gì xảy ra.” – Yang Gwan Sik, Tập 6\n\nEm cũng vậy. Dù có những ngày chẳng dễ dàng, em vẫn có thể bắt đầu lại việc lắng nghe và đồng cảm – bắt đầu từ chính em, rồi đến những người em yêu thương.',
    sevenDayChallenge: {
      title: 'Thử thách 7 ngày thấu cảm',
      description: 'Hành trình để em học cách lắng nghe bằng trái tim, hàn gắn rạn nứt và cảm nhận sự kết nối.',
      days: [
        { day: 1, content: 'Lắng nghe không lời: Gọi điện hoặc ngồi cạnh người thân, chỉ lắng nghe mà không ngắt lời hay khuyên bảo.' },
        { day: 2, content: 'Nhìn lại yêu thương: Viết một lá thư tay (dù ngắn) kể về kỷ niệm đẹp ngày nhỏ gửi cha mẹ/người nuôi nấng.' },
        { day: 3, content: 'Biết ơn bạn bè: Gửi tin nhắn thoại/video ngắn cảm ơn một người bạn đã từng giúp đỡ mình.' },
        { day: 4, content: 'Gọi cho người xa cách: Gọi điện hỏi thăm một người đã lâu không liên lạc một cách chân thành.' },
        { day: 5, content: 'Hành động nhỏ – Yêu thương lớn: Pha ấm trà, chuẩn bị bữa sáng hoặc nhắn nhủ dịu dàng cho người em yêu.' },
        { day: 6, content: 'Bắt đầu hàn gắn: Viết một bức thư thừa nhận lỗi lầm và mong muốn hiểu cảm giác của người đang rạn nứt.' },
        { day: 7, content: 'Cảm nhận sự gắn bó: Gửi bức thư đã viết hoặc rủ người đó gặp mặt trực tiếp khi em sẵn sàng.' }
      ]
    },
    reflection: {
      title: 'Nhật ký sau 7 ngày',
      subtitle: 'Sau 7 ngày thực hành thấu cảm, em thấy mình thế nào?',
      questions: [
        'Hôm nay em đã thực sự lắng nghe ai chưa?',
        'Em đã được ai lắng nghe chưa?',
        'Em muốn giữ điều gì cho những ngày tiếp theo?'
      ],
      footer: '“Thấu cảm không phải là kỹ năng, mà là một cách sống. Mùa thu có qua, nhưng nếu em học được cách im lặng để nghe, cách cho đi không tính toán – thì mùa thu của lòng nhân ái sẽ ở lại rất lâu trong em.”'
    },
    eqTests: [],
    conclusion: 'Em đừng lo nếu có ngày em làm chưa tốt. Ae Sun cũng đã vấp ngã nhiều lần.'
  },
  winter: {
    id: 'winter',
    name: 'Đông',
    theme: 'Buông bỏ & Tỉnh thức',
    heroTitle: 'Im lặng, Buông bỏ & Tỉnh thức',
    heroSubtitle: 'Chấp nhận vô thường, buông bỏ điều không còn thuộc về mình và tái tạo năng lượng.',
    heroImage: 'https://images.unsplash.com/photo-1457269449834-928af64c684d?auto=format&fit=crop&q=80&w=1974',
    color: '#3b82f6',
    accentColor: 'bg-blue-500',
    quote: 'Mùa đông không làm cây chết đi. Mùa đông chỉ dạy cây cách đứng yên để giữ lấy phần sống còn lại.',
    actions: [
      { icon: '❄️', text: 'Buông bỏ kỳ vọng' },
      { icon: '🧘', text: 'Thiền tỉnh thức' },
      { icon: '💨', text: 'Thả lại cho mùa gió' }
    ],
    tracks: [
      {
        id: 'wi1',
        title: 'Bình thản chấp nhận bản thân',
        subtitle: 'Chương Đông — Tỉnh thức',
        duration: '08:10',
        audioUrl: '/dong.mp3',
        coverUrl: 'https://images.unsplash.com/photo-1457269449834-928af64c684d?auto=format&fit=crop&q=80&w=1974',
      }
    ],
    storyTitle: 'Khi vỏ quýt khô lại trong mùa lạnh',
    storyContent: 'Mùa đông trên đảo không ồn ào. Gió đi qua từng mái nhà như nhắc người ta rằng mọi thứ rồi cũng sẽ thay đổi. Ae-sun đã đi qua những mùa nhiều nước mắt, nhiều dằn vặt, nhiều níu kéo. Đến mùa đông, cô mới hiểu: có những điều mình không giữ được, không phải vì mình kém, mà vì chúng vốn dĩ không thuộc về mình mãi mãi.\n\nCô nhìn những cành cây trơ trụi, những quả quýt cuối mùa còn sót lại, và hiểu rằng sự sống không biến mất chỉ vì vẻ ngoài im lặng. Điều sống được trong mùa đông không phải là thứ ồn ào nhất, mà là thứ bền nhất. Tỉnh thức cũng vậy: không phải là lúc tâm trí không còn sóng, mà là lúc ta nhìn sóng mà không còn hoảng sợ.\n\nVới sinh viên, mùa đông là giai đoạn phải học cách buông bớt kỳ vọng, bớt so sánh, bớt tự ép mình phải luôn ổn. Chương Đông giúp người học hiểu rằng: bình an không đến từ việc mọi thứ hoàn hảo, mà đến từ việc mình thôi chống lại những điều đã qua.',
    eqTests: [
      {
        id: 'wi-letgo',
        title: 'Mức độ sẵn sàng buông bỏ',
        description: 'Đo lường khả năng chấp nhận thay đổi và niềm tin vào tương lai.',
        stats: {
          questions: 12,
          time: '6 phút',
          scale: [
            { value: 1, label: 'Hoàn toàn không đúng', emoji: '🟤' },
            { value: 2, label: 'Hơi đúng', emoji: '🟠' },
            { value: 3, label: 'Khá đúng', emoji: '🟡' },
            { value: 4, label: 'Rất đúng', emoji: '🟢' }
          ]
        },
        instructions: [
          'Số câu hỏi: 12',
          '1 = Hoàn toàn không đúng, 4 = Rất đúng'
        ],
        questions: [
          { id: 'w1', text: 'Mình thường xuyên nghĩ lại những chuyện đã qua và cảm thấy tiếc nuối.' },
          { id: 'w2', text: 'Những sai lầm trong quá khứ khiến mình khó tiến về phía trước.' },
          { id: 'w3', text: 'Mình hay tự hỏi "giá như lúc đó mình làm khác đi...".' },
          { id: 'w4', text: 'Mình thường tự trách bản thân khi mắc lỗi.' },
          { id: 'w5', text: 'Mình cảm thấy mình chưa đủ tốt so với người khác.' },
          { id: 'w6', text: 'Khi thất bại, mình dễ nghĩ đó là do bản thân kém cỏi.' },
          { id: 'w7', text: 'Mình cảm thấy khó chịu khi mọi thứ không diễn ra như kế hoạch.' },
          { id: 'w8', text: 'Mình mất nhiều thời gian để chấp nhận một sự thay đổi.' },
          { id: 'w9', text: 'Khi cuộc sống thay đổi, mình thường cảm thấy mất kiểm soát.' },
          { id: 'w10', text: 'Mình tin rằng tương lai sẽ có những điều tốt đẹp hơn.' },
          { id: 'w11', text: 'Mình cảm thấy mình có thể bắt đầu lại nếu cần.' },
          { id: 'w12', text: 'Mình tin rằng mọi chuyện xảy ra đều có ý nghĩa nhất định.' }
        ],
        options: [
          { value: 1, label: 'Hoàn toàn không đúng' },
          { value: 2, label: 'Hơi đúng' },
          { value: 3, label: 'Khá đúng' },
          { value: 4, label: 'Rất đúng' }
        ],
        results: {
          type: 'score',
          ranges: [
            { min: 12, max: 24, title: 'Đang nắm rất chặt', insight: 'Bạn có xu hướng giữ lại cảm xúc, quá khứ và tự gây áp lực cho bản thân.', suggestion: 'Cần học cách nhẹ tay với chính mình.' },
            { min: 25, max: 36, title: 'Đang học buông', insight: 'Bạn đã bắt đầu nhận thức, nhưng vẫn còn bị cảm xúc kéo lại.', suggestion: 'Hãy tiếp tục kiên nhẫn.' },
            { min: 37, max: 48, title: 'Đã có khả năng thả lỏng', insight: 'Bạn có nền tảng nội tâm khá vững và linh hoạt với cuộc sống.', suggestion: 'Hãy duy trì sự tỉnh thức này.' }
          ]
        }
      }
    ],
    conclusion: 'Buông bỏ không phải là quên, mà là không để điều đã qua chiếm lấy toàn bộ căn phòng của hiện tại.'
  }
};
