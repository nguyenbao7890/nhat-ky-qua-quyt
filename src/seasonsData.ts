import { Track } from './types';

export type SeasonId = 'spring' | 'summer' | 'autumn' | 'winter';

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
  eqTest: {
    title: string;
    description: string;
    instructions: string[];
    questions: { id: string; text: string; category?: string; reversed?: boolean }[];
    options: { value: number; label: string }[];
    results: {
      type: 'pillars' | 'score';
      categories?: Record<string, string>;
      ranges?: { min: number; max: number; title: string; insight: string; suggestion: string }[];
    };
  };
  conclusion: string;
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
    eqTest: {
      title: 'Bản đồ cảm xúc - Hành trình nhận diện',
      description: 'Khám phá 5 trụ cột trí tuệ cảm xúc của bạn.',
      instructions: [
        'Số câu hỏi: 20',
        'Thời gian dự kiến: 8–10 phút',
        'Trả lời thật lòng theo những gì bạn thực sự làm và cảm nhận.'
      ],
      questions: [
        { id: '1', text: 'Khi một cảm xúc khó chịu xuất hiện, tôi thường nhận ra ngay đó là cảm xúc gì.', category: 'self-awareness' },
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
        { id: '14', text: 'Tôi có những cách lành mạnh để xả stress (nghe nhạc, viết, đi bộ...).', category: 'stress' },
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
    conclusion: 'Chúc em một mùa Xuân gieo mầm nhẹ nhàng. Hãy nhớ hít một hơi thật sâu và tự nhủ: "Mình đang ở đây. Mình sẵn sàng lắng nghe chính mình."'
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
    storyContent: 'Mùa hạ ở Jeju không dịu dàng như người ta vẫn nghĩ. Nắng đổ xuống mái nhà, biển thì sáng lóa, còn lòng người đôi khi lại nóng rát vì những điều không thể giữ nổi. Ae-sun bước vào mùa hạ của đời mình bằng những vết xước đầu tiên: một lần thất bại, một lần bị hiểu lầm, một lần nhận ra rằng có những điều dù cố đến mấy cũng không cứu được.\n\nNhư một quả quýt chín quá dưới nắng, lớp vỏ có thể nứt, nhưng bên trong vẫn còn nước, còn vị, còn một thứ ngọt ngào rất chậm để người ta học cách nếm lại chính mình. Chương Hạ được tạo ra để nói với người trẻ rằng: không sao cả nếu em đang mệt, đang chới với, đang thấy mình không còn đủ sức. Điều quan trọng là em biết cách đứng dậy sau khi đã thật sự chạm đáy cảm xúc.',
    eqTest: {
      title: 'Bạn đang kẹt trong mùa hạ nào?',
      description: 'Nhận diện mức độ căng thẳng của bạn trong 2 tuần gần đây.',
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
    },
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
    storyTitle: 'Thu đi - Thấu cảm và kết nối',
    storyContent: 'Em có nhớ Ae-sun trong "Khi cuộc đời cho bạn quả quýt" không? Cuộc đời đã trao cho cô ấy không ít quả quýt chua. Thế nhưng, điều làm em rung động nhất chính là cách cô ấy vẫn chọn thấu cảm. Cô ấy khóc, cô ấy đau, nhưng cô ấy vẫn biết lắng nghe người khác, vẫn dang tay hàn gắn những rạn nứt.\n\n“Mưa có thể rơi như thể nó sẽ cuốn trôi mọi thứ. Nhưng khi mặt trời lên, cuộc sống lại tiếp tục, bất kể điều gì xảy ra.” – Yang Gwan Sik. Em cũng vậy. Dù có những ngày chẳng dễ dàng, em vẫn có thể bắt đầu lại việc lắng nghe và đồng cảm – bắt đầu từ chính em, rồi đến những người em yêu thương.',
    eqTest: {
      title: 'Vị quýt của tôi',
      description: 'Giá trị sống & Tự chấp nhận. Mỗi múi quýt - chua, chát, ngọt - đều kể cho em nghe một điều về con người thật của em.',
      instructions: [
        'Số câu hỏi: 10',
        'Chọn đáp án đầu tiên bật lên trong đầu.',
        'Mỗi câu có 3 lựa chọn tương ứng với Chua, Chát, Ngọt.'
      ],
      questions: [
        { id: 'v1', text: 'Khi em mắc một lỗi lớn, điều em thường làm nhất sau đó là...' },
        { id: 'v2', text: 'Em nghĩ thế nào về những ước mơ hồi nhỏ (làm phi công, ca sĩ...)?' },
        { id: 'v3', text: 'Khi bạn thân của em đạt được thành công lớn trong khi em vẫn đang loay hoay...' },
        { id: 'v4', text: 'Bố mẹ hay người thân có kỳ vọng vào em (học ngành A, làm việc B...). Em thường...' },
        { id: 'v5', text: 'Khi nhìn lại 5 năm qua, em cảm thấy thế nào về những thất bại của mình?' },
        { id: 'v6', text: 'Em có dễ dàng tha thứ cho chính mình khi đã làm điều gì đó trái với giá trị của mình không?' },
        { id: 'v7', text: 'Buổi tối, khi nằm một mình, suy nghĩ thường trực của em là...' },
        { id: 'v8', text: 'Có ai đó nói rằng em "quá nhạy cảm" hoặc "nghĩ nhiều". Em phản ứng ra sao?' },
        { id: 'v9', text: 'Khi em gặp một người lạ hoặc ở môi trường mới, em thường...' },
        { id: 'v10', text: 'Định nghĩa của em về "thành công" trong 5 năm tới là gì?' }
      ],
      options: [
        { value: 1, label: 'Chua (⭐)' },
        { value: 2, label: 'Chát (🌶️)' },
        { value: 3, label: 'Ngọt (🍯)' }
      ],
      results: { type: 'score' }
    },
    conclusion: 'Thấu cảm không phải là kỹ năng, mà là một cách sống. Mùa thu có qua, nhưng nếu em học được cách im lặng để nghe, cách cho đi không tính toán – thì mùa thu của lòng nhân ái sẽ ở lại rất lâu trong em.'
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
    storyContent: 'Mùa đông trên đảo không ồn ào. Gió đi qua từng mái nhà như nhắc người ta rằng mọi thứ rồi cũng sẽ thay đổi. Ae-sun đã đi qua những mùa nhiều nước mắt, nhiều dằn vặt, nhiều níu kéo. Đến mùa đông, cô mới hiểu: có những điều mình không giữ được, không phải vì mình kém, mà vì chúng vốn dĩ không thuộc về mình mãi mãi.\n\nTỉnh thức cũng vậy: không phải là lúc tâm trí không còn sóng, mà là lúc ta nhìn sóng mà không còn hoảng sợ. Với sinh viên, mùa đông là giai đoạn phải học cách buông bớt kỳ vọng, bớt so sánh, bớt tự ép mình phải luôn ổn. Bình an không đến từ việc mọi thứ hoàn hảo, mà đến từ việc mình thôi chống lại những điều đã qua.',
    eqTest: {
      title: 'Mức độ sẵn sàng buông bỏ',
      description: 'Đo lường khả năng chấp nhận thay đổi và niềm tin vào tương lai.',
      instructions: [
        'Số câu hỏi: 12',
        '1 = Hoàn toàn không đúng, 2 = Hơi đúng, 3 = Khá đúng, 4 = Rất đúng'
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
          { min: 12, max: 24, title: 'Đang nắm rất chặt', insight: 'Bạn có xu hướng giữ lại cảm xúc, quá khứ và tự gây áp lực cho bản thân.', suggestion: 'Cần học cách nhẹ tay với chính mình, buông bỏ những gánh nặng không cần thiết.' },
          { min: 25, max: 36, title: 'Đang học buông', insight: 'Bạn đã bắt đầu nhận thức, nhưng vẫn còn bị cảm xúc kéo lại.', suggestion: 'Hãy tiếp tục kiên nhẫn, việc buông bỏ là một quá trình chứ không phải đích đến.' },
          { min: 37, max: 48, title: 'Đã có khả năng thả lỏng', insight: 'Bạn có nền tảng nội tâm khá vững và linh hoạt với cuộc sống.', suggestion: 'Hãy duy trì sự tỉnh thức này để đón nhận những chương mới của cuộc đời.' }
        ]
      }
    },
    conclusion: 'Buông bỏ không phải là quên, mà là không để điều đã qua chiếm lấy toàn bộ căn phòng của hiện tại. Có những ký ức bạn không cần xóa. Bạn chỉ cần học cách để nó nằm yên, như một chiếc lá mùa đông – không còn đau, chỉ còn hình hài của những gì đã sống.'
  }
};
